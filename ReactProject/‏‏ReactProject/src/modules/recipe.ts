import Ingredient from "./Ingredient";
import Instruction from "./Instruction";

export default interface Recipe {
    Id: number;
    Name: string;
    Instructions: Instruction[];
    Difficulty: string;
    Duration: string;
    Description: string;
    UserId: number;
    Categoryid: number;
    Img: string;
    Ingridents: Ingredient[];
    createAt: Date;
    updateAt: Date;
}
