import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateExpense } from '../../data/transactions/create-expense.dto';
import { CreateIncome } from '../../data/transactions/create-income.dto';
import { TransactionService } from '../../data/transactions/transaction.service';
import MongooseClassSerializerInterceptor from '../mongooseClassSerializer.interceptor';
import { Transaction } from '../../data/transactions/transaction.schema';
import { UserIdInterceptor } from '../userId.interceptor';
import { RequestWithUser } from '../../auth/request-with-user.interface';

@UseInterceptors(
  MongooseClassSerializerInterceptor(Transaction),
  UserIdInterceptor,
)
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionService) {}

  @Post('income')
  async addIncome(@Body(ValidationPipe) createIncome: CreateIncome) {
    console.log(createIncome);
    return this.transactionService.addIncome(createIncome);
  }

  @Post('expense')
  async addExpense(@Body(ValidationPipe) createExpense: CreateExpense) {
    return this.transactionService.addExpense(createExpense);
  }
  @Get('expenses')
  async getUserExpenses(
    @Request() req: RequestWithUser,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    // let startDate = new Date();
    // let endDate = startDate.setDate(1);
    // if (from) {
    //   startDate = new Date(from);
    // }
    // if (to) {
    //   endDate = new Date(to);
    // }
    let start = new Date(from);
    let end = new Date(to);

    if (start instanceof Date && isNaN(start.getTime())) {
      start = new Date();
      start.setDate(0);
    }
    if (end instanceof Date && isNaN(end.getTime())) {
      end = new Date();
    }
    const expenses = await this.transactionService.getExpensesByUserId(
      req.user.id,
      [start, end],
    );

    return expenses;
  }

  @Get('incomes')
  async getUserIncomes(
    @Request() req: RequestWithUser,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    console.log(from, to);
    let start = new Date(from);
    let end = new Date(to);

    if (start instanceof Date && isNaN(start.getTime())) {
      start = new Date();
      start.setDate(0);
    }
    if (end instanceof Date && isNaN(end.getTime())) {
      end = new Date();
    }
    // const currentDate = new Date();
    // currentDate.setDate(1);

    const incomes = await this.transactionService.getIncomesByUserId(
      req.user.id,
      [start, end],
    );

    return incomes;
  }
}
