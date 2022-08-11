import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { DataSource, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {validate as isUUID } from 'uuid'
import {Product , ProductImage } from './entities';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(

    @InjectRepository(Product)
    private readonly productsRepository:Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepository:Repository<ProductImage>,

    private readonly dataSource:DataSource,

  ) {}


  async create(createProductDto: CreateProductDto,user:User) {

    try {

      const {images = [],...productDetails} = createProductDto;

      const product = this.productsRepository.create({
        ...productDetails,
        user,
        images:images.map(image => this.productImageRepository.create({url:image}) ),
      });
      await this.productsRepository.save(product);

      return  {...product,images};
      
    } catch (error) {
      this.handleExceptions(error);
    }

  }



  async findAll(paginationDto:PaginationDto) {
    const {limit=10, offset=0} = paginationDto;
    const products = await  this.productsRepository.find({
      take:limit,
      skip:offset,
      relations:{
        images:true
      }
    })

    return products.map( ({images,...rest}) => ({
      ...rest,
      images:images.map( image => image.url)
    }));

  }


  async findOne(term: string) {

    let product:Product;
    if(isUUID(term)){
      product = await this.productsRepository.findOneBy({ id: term });
    }else{
     // product = await this.productsRepository.findOneBy({ slug: term });
     const queryBuilder = this.productsRepository.createQueryBuilder('product');
      product = await queryBuilder.where('UPPER(title) =:title or slug =:slug', { slug: term.toUpperCase(), title:term.toLowerCase() }).leftJoinAndSelect('product.images','productImages').getOne();
    }

    if(!product)
    throw new NotFoundException(`Product with ${term} not found`);
    return product;
  }


  async findOnePlain(term: string) {
    const {images = [],...rest } = await this.findOne(term);

    return {...rest,images:images.map( image => image.url)};
  }



  async update(id: string, updateProductDto: UpdateProductDto,user:User) {

    const {images,...rest} = updateProductDto;
      const product = await this.productsRepository.preload({
        id,
        ...rest
      })

      if(!product) throw new NotFoundException(`Product with ${id} not found`);

      //Create query runner
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {

        if(images){
          await queryRunner.manager.delete(ProductImage,{product:id});
          product.images = images.map(
            image => this.productImageRepository.create({url:image})
            )
        }

        product.user = user;
        // }else{
        //   product.images = await this.productImageRepository.findBy({product:{id}});
        // }
        await queryRunner.manager.save(product);
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return this.findOnePlain(id);
         // await this.productsRepository.save(product);
      } catch (error) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        this.handleExceptions(error);
      }
  }



  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }


  private handleExceptions(error: any) {
    if(error.code === '23505')
    throw new BadRequestException(error.detail);

    this.logger.error( error );
    throw new InternalServerErrorException('Unexpected error,check the logs');
  }

  async deleteAllProducts(){
    const query = this.productsRepository.createQueryBuilder('product');

    try {
      return await query
      .delete()
      .where({})
      .execute();
    } catch (error) {
      this.handleExceptions(error);
    }

  }


}
