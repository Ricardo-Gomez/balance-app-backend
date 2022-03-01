import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpense } from './create-expense.dto';
import { CreateIncome } from './create-income.dto';
import {
  ExpenseTransaction,
  ExpenseTransactionDocument,
} from './expense-transaction.schema';
import {
  IncomeTransaction,
  IncomeTransactionDocument,
} from './income-transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(IncomeTransaction.name)
    private incomeModel: Model<IncomeTransactionDocument>,
    @InjectModel(ExpenseTransaction.name)
    private expenseModel: Model<ExpenseTransactionDocument>,
  ) {}

  public async addIncome(
    createIncome: CreateIncome,
  ): Promise<IncomeTransactionDocument> {
    createIncome = { ...createIncome, type: IncomeTransaction.name };
    return this.incomeModel
      .create(createIncome)
      .then((income) => income.populate('source'));
  }
  public async addExpense(
    createExpense: CreateExpense,
  ): Promise<ExpenseTransactionDocument> {
    createExpense = { ...createExpense, type: ExpenseTransaction.name };
    return this.expenseModel
      .create(createExpense)
      .then((expense) => expense.populate('source'));
  }
  public async getExpensesByUserId(
    userId: string,
    dates?: Date[],
  ): Promise<ExpenseTransactionDocument[]> {
    const query = this.buildQueryWithDates(userId, dates);
    return this.expenseModel.find(query).populate('source');
  }
  public async getIncomesByUserId(
    userId: string,
    dates?: Date[],
  ): Promise<IncomeTransactionDocument[]> {
    const query = this.buildQueryWithDates(userId, dates);
    return this.incomeModel.find(query).populate('source');
  }
  private buildQueryWithDates(userId: string, dates?: Date[]) {
    const currentDate = new Date();
    currentDate.setDate(1);
    if (dates) {
      return {
        userId,
        date: { $gte: dates[0], $lt: dates[1] },
      };
    }

    return {
      userId,
      date: { $gte: currentDate, $lt: new Date() },
    };
  }
}
