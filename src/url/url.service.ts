/* import { 
    Injectable,
    BadRequestException,
    NotFoundException,
    UnprocessableEntityException, 
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';
import { ShortenURLDto } from './DTOs/url.dto';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';

@Injectable()
export class UrlService {

    constructor(
        @InjectRepository(Url)
        private repositoryUrl: Repository<Url>,
      ) {}


   
    async shortenUrl(url: ShortenURLDto) {

        const { longUrl } = url;

        //checks if longurl is a valid URL
        if (!isURL(longUrl)) {
        throw new BadRequestException('String Must be a Valid URL');
      }

      const urlCode = nanoid(10);
      const baseURL = 'http://localhost:3000/api';

      try {
        //check if the URL has already been shortened
        let url = await this.repositoryUrl.findOneBy({ longUrl });
        //return it if it exists
        if (url) return url.shortUrl;
  
        //if it doesn't exist, shorten it
        const shortUrl = `${baseURL}/${urlCode}`;
  
        //add the new record to the database
        url = this.repositoryUrl.create({
          urlCode,
          longUrl,
          shortUrl,
        });
  
        this.repositoryUrl.save(url);
        return url.shortUrl;

      } catch (error) {
        console.log(error);
        throw new UnprocessableEntityException('Server Error');
      }

    }


    async redirect(urlCode: string) {

        try {
            const url = await this.repositoryUrl.findOneBy({ urlCode });
            if (url) return url;
        } catch (error) {
            console.log(error);
            throw new NotFoundException('Resource Not Found');
        }

    }
}
 */