import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Technique } from "./entity/Techniques";




@Resolver()
export class TechniqueResolver {

    //find all techniques
    @Query(() => [Technique])
    techniques() {
        return Technique.find();
    }


    
      //make technique query
      @Mutation(() => Boolean)
      async makeTech(
         @Arg('title') title: string,
         @Arg('description') description: string,
         @Arg('image') image: string
 
     ) {
         await Technique.insert({
             title,
             description,
             image
         })
         return true
        }
    }