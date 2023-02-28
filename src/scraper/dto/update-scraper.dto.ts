import { PartialType } from '@nestjs/mapped-types';
import { CreateScraperDto } from './create-scraper.dto';

export class UpdateScraperDto extends PartialType(CreateScraperDto) {}
