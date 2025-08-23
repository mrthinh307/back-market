import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  // Product-specific methods will be added here
  // Variant selection logic has been moved to ProductVariantService
}
