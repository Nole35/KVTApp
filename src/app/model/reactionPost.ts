import {ReactionType} from "./enums/reactionType";

export interface ReactionPost{

  reactionId:number;
  type:ReactionType;
  timestamp:string;
  user:number;
  post:number;

}
