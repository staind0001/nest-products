import { Product } from "../../products/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column('text',{
        unique:true,
    })
    email:string;

    @Column('text',{
        select:false,
    })
    password:string;

    @Column('text')
    fullName:string;

    @Column('bool',{
        default:true,
        unique:true,
    })
    isActive:boolean;

    @Column('text',{
        array:true,
        default:['user']
    })
    roles:string[];

    @BeforeInsert()
    checkFiledsBeforeInsert(){
        this.email = this.email.toLowerCase().trim();
    }

     @OneToMany(
    () => Product,
    (product) => product.user,
     )
     product: Product;

    @BeforeUpdate()
    checkFiledsBeforeUpdate(){
        this.checkFiledsBeforeInsert();
    }



}
