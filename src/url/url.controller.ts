/* import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { ShortenURLDto } from './DTOs/url.dto';
import {Response} from 'express';

@Controller()
export class UrlController {

    constructor(private urlService: UrlService) {}


    @Post('shorten') shortenUrl(@Body() url: ShortenURLDto) {

        return this.urlService.shortenUrl(url);

    }

    @Get(':code') async redirect(@Res() res: Response, @Param('code') code: string) {
    const url = await this.urlService.redirect(code);

    if(url)
    return res.redirect(url.longUrl);
  }
}
 */