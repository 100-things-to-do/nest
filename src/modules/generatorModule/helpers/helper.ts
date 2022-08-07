import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Topic } from '../../../schemas/topic.schema';
import { Document, Model } from 'mongoose';

@Injectable()
export class Helper {
  getUpdatedFieldsQuery(document: any, parentObject): any {
    const queryObj = {};
    const obj = Object.entries(document);
    for (const entry of obj) {
      if (entry[1] != null) {
        if (parentObject != null) {
          queryObj[`${parentObject}.${entry[0]}`] = entry[1];
        } else {
          queryObj[`${entry[0]}`] = entry[1];
        }
      }
    }
    return queryObj;
  }
}
