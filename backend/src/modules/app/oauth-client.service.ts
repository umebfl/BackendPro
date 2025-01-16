import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OAuthClient, OAuthClientDocument } from './oauth-client.entity';
import { CreateOAuthClientDto } from './dto/create-oauth-client.dto';
import { UpdateOAuthClientDto } from './dto/update-oauth-client.dto';

@Injectable()
export class OAuthClientService {
  constructor(
    @InjectModel(OAuthClient.name)
    private oauthClientModel: Model<OAuthClientDocument>,
  ) {}

  async create(
    createOAuthClientDto: CreateOAuthClientDto,
  ): Promise<OAuthClient> {
    const createdClient = new this.oauthClientModel(createOAuthClientDto);
    return createdClient.save();
  }

  async findAll(): Promise<OAuthClient[]> {
    return this.oauthClientModel.find().exec();
  }

  async findOne(id: string): Promise<OAuthClient> {
    const client = await this.oauthClientModel.findById(id).exec();
    if (!client) {
      throw new NotFoundException(`OAuthClient with ID ${id} not found`);
    }
    return client;
  }

  async findByAppId(appId: string): Promise<OAuthClient> {
    const client = await this.oauthClientModel.findOne({ appId }).exec();
    if (!client) {
      throw new NotFoundException(`OAuthClient with appId ${appId} not found`);
    }
    return client;
  }

  async update(
    id: string,
    updateOAuthClientDto: UpdateOAuthClientDto,
  ): Promise<OAuthClient> {
    const updatedClient = await this.oauthClientModel
      .findByIdAndUpdate(id, updateOAuthClientDto, { new: true })
      .exec();
    if (!updatedClient) {
      throw new NotFoundException(`OAuthClient with ID ${id} not found`);
    }
    return updatedClient;
  }

  async remove(id: string): Promise<void> {
    const result = await this.oauthClientModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`OAuthClient with ID ${id} not found`);
    }
  }
}
