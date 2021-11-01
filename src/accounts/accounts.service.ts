import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Business, BusinessDocument } from '../businesses/schemas/business.schema';



@Injectable()
export class AccountsService {
    constructor(@InjectModel(Business.name) private businessModel: Model<BusinessDocument>) {}

    async findAccounts(businessId: string, roles: [string]): Promise<any> {

        const conditionalAggregationPipe = (!roles.includes('admin')) ? 'public' : {$exists: true};


        return await this.businessModel.aggregate(
            [
                {
                  $facet:{
                    'singleAccount':[
                      { $unwind: '$accounts' },
                      { $unwind: '$accounts.transactions' },
                      { $match: { _id: new Types.ObjectId('617fab634755017ba940e516')}},
                      { $match:{'accounts.grant': conditionalAggregationPipe}},
                      { $group: { 
                        _id: '$accounts._id', 
                        totBalance: { $last: "$accounts.transactions.balance" }, 
                        totIncome: {$sum:"$accounts.transactions.income"}, 
                        totExpense: {$sum:"$accounts.transactions.expenses"},
                        accountName: {$last:"$accounts.name"},
                        } 
                      },
                      { $unset: "_id" }
                    ],
                    'aggregate':[
                      { $unwind: '$accounts' },
                      { $unwind: '$accounts.transactions' },
                      { $match: { _id: new Types.ObjectId(businessId)}},
                      { $match:{'accounts.grant': conditionalAggregationPipe}},
                      { $group: { 
                        _id: '$accounts._id', 
                        totBalance: { $last: "$accounts.transactions.balance" }, 
                        totIncome: {$sum:"$accounts.transactions.income"}, 
                        totExpense: {$sum:"$accounts.transactions.expenses"},
                        }
                      },
                      { $group: {
                          _id:null,
                          totBalance:{$sum:"$totBalance"},
                          totIncome:{$sum:"$totIncome"},
                          totExpense:{$sum:"$totExpense"}
                        }
                      },
                      { $unset: "_id" }
                    ]
                  }
                }
              ]
        );

    }

    async findAccountsMonthlyStatement(businessId: string, roles: [string]): Promise<any> {

        const conditionalAggregationPipe = (!roles.includes('admin')) ? 'public' : {$exists: true};


        return await this.businessModel.aggregate(
            [
                {
                    $facet:{
                    'singleAccount':[
                        { $unwind: '$accounts' },
                        { $unwind: '$accounts.transactions' },
                        { $match: { _id: new Types.ObjectId(businessId)}},
                        { $match:{'accounts.grant': conditionalAggregationPipe}},
                        { $group: { 
                            _id: { 
                            month: { $month: {$dateFromString : {dateString:"$accounts.transactions.date"} }},
                            year: { $year: {$dateFromString : {dateString:"$accounts.transactions.date"} }},
                            id : '$accounts._id'
                            }, 
                            totBalance: { $last: "$accounts.transactions.balance" }, 
                            totIncome: {$sum:"$accounts.transactions.income"}, 
                            totExpense: {$sum:"$accounts.transactions.expenses"},
                            accountName: {$last:"$accounts.name"},
                        } 
                        },
                        { $group: { 
                            _id: { 
                            id : '$_id.id'
                            },
                            accountName: { $first:"$accountName"},
                            monthlyData: { $push:  
                            {
                                month: "$_id.month",
                                year: "$_id.year",
                                totBalance: '$totBalance', 
                                totIncome: '$totIncome', 
                                totExpense: '$totExpense',
                            }
                            }
                        } 
                        }
                    ],
                    'aggregate':[
                        { $unwind: '$accounts' },
                        { $unwind: '$accounts.transactions' },
                        { $match: { _id: new Types.ObjectId(businessId)}},
                        { $match:{'accounts.grant': conditionalAggregationPipe}},
                        { $group: { 
                        _id: { 
                            month: { $month: {$dateFromString : {dateString:"$accounts.transactions.date"} }},
                            year: { $year: {$dateFromString : {dateString:"$accounts.transactions.date"} }},
                            _id: '$accounts._id',
                        }, 
                        totBalance: { $last: "$accounts.transactions.balance" }, 
                        totIncome: {$sum:"$accounts.transactions.income"}, 
                        totExpense: {$sum:"$accounts.transactions.expenses"},
                        }
                        },
                        { $group: {
                            _id: {
                            month : "$_id.month",
                            year : "$_id.year"
                            },
                            month: { $first:"$_id.month"},
                            year: { $first:"$_id.year"},
                            totBalance: { $sum:"$totBalance"}, 
                            totIncome: { $sum:"$totIncome"}, 
                            totExpense: { $sum:"$totExpense"},
                        }
                        },
                        { $unset: "_id" }
                    ]
                    }
                }
                ]
        );

    }

    async findAccountsIntervalStatement(businessId: string, roles: [string],fromDate:string,toDate:string): Promise<any> {

        const conditionalAggregationPipe = (!roles.includes('admin')) ? 'public' : {$exists: true};


        return await this.businessModel.aggregate(
            [
                { $unwind: '$accounts' },
                { $unwind: '$accounts.transactions' },
                { $match: { _id: new Types.ObjectId(businessId)}},
                { $match:{'accounts.grant': conditionalAggregationPipe}},
                { $addFields: {
                  date: {
                    $dateFromString: { dateString: "$accounts.transactions.date", format: "%Y-%m-%d" }
                  } 
                }},
                { $match: {
                  date: {
                    "$gte": new Date(fromDate),
                    "$lte": new Date(toDate)
                  }
                }},
                { $group: { 
                  _id:'$accounts._id',
                  totBalance: { $last: "$accounts.transactions.balance" }, 
                  totIncome: {$sum:"$accounts.transactions.income"}, 
                  totExpense: {$sum:"$accounts.transactions.expenses"},
                  }
                },
                { $group: {
                    _id:null,
                    totBalance:{$sum:"$totBalance"},
                    totIncome:{$sum:"$totIncome"},
                    totExpense:{$sum:"$totExpense"}
                  }
                },
                { $unset: "_id" }
              ] 
        );

    }
}
