import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { OfferService } from '../offer/index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const offer = await this.offerService.findById(dto.offerId);
    if (!offer) {
      throw new Error(`Offer with id ${dto.offerId} not found`);
    }

    const comment = await this.commentModel.create({
      ...dto,
      offerId: offer.id
    });

    offer.commentsCount = (await this.findByOfferId(dto.offerId)).length;
    offer.rating = await this.getAverageRating(dto.offerId);
    await offer.save();

    this.logger.info(`New comment for offer ${dto.offerId} created`);
    return comment;
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find({offerId: offerId}).exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new Error(`Offer with id ${offerId} not found`);
    }

    offer.commentsCount = 0;
    offer.rating = 0;
    await offer.save();

    const result = await this.commentModel.deleteMany({offerId: offerId}).exec();
    return result.deletedCount;
  }

  public async getAverageRating(offerId: string): Promise<number> {
    const comments = await this.findByOfferId(offerId);
    if (!comments.length) {
      return 0;
    }
    const totalRating = comments.reduce((sum, comment) => sum + comment.rating, 0);
    return parseFloat((totalRating / comments.length).toFixed(1));
  }
}
