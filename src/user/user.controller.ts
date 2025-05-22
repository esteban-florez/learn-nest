import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Res,
  Req,
  Query,
  Headers,
  Session,
  Redirect,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { LimitQueryDto } from './dto/limit-query.dto'
import { type Request, type Response } from 'express'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
    return this.userService.create(createUserDto)
  }

  @Get('all')
  @Redirect('http://localhost:3000', 301)
  public redirected() {}

  @Get()
  findAll(
    @Query() query: LimitQueryDto,
    @Query('someparam') someParam: string,
    @Headers('Accept') accept: string,
    @Res({ passthrough: true }) res: Response,
    @Session() session: Record<string, unknown>,
  ) {
    console.log('Session:', session)
    console.log('Accept header:', accept)
    console.log('Some param:', someParam)
    res.header('X-Custom-Header', 'customheader')
    return this.userService.findAll(query.limit)
  }

  @Get(':id')
  @HttpCode(202)
  findOne(@Req() req: Request, @Param('id') id: string) {
    console.log(req.host)
    return this.userService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }
}
