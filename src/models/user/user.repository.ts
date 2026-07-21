import { Inject, Injectable } from "@nestjs/common";
import { AbstractRepository } from "../abstract.repository";
import { User } from "./user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

type TUser= User & Document

@Injectable()

export class UserRebository extends AbstractRepository<TUser>{
    constructor(@InjectModel(User.name) userModel:Model<TUser>){
        super(userModel)
    }
}