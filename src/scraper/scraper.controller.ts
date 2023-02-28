import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { CreateScraperDto } from './dto/create-scraper.dto';
import { UpdateScraperDto } from './dto/update-scraper.dto';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}
}
