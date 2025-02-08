import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ActivityService } from 'src/activity/activity.service';
import { ClientDTO } from 'src/DTO/client.dto';
import { Client } from 'src/entity/client.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    private activityService: ActivityService,
  ) {}

  async addClientAndSupplier(data: ClientDTO, req: Request) {
    try {
      await this.clientRepo.insert(data);

      await this.activityService.addActivity(
        req,
        data.status == 'client' ? 'add a client' : 'add a supplier',
      );
      return {
        status: true,
        message:
          data.status == 'client'
            ? 'Client added successfully'
            : 'Supplier added successfully',
      };
    } catch (error) {
      console.log(error);

      return {
        status: false,
        message: 'Something went wrong',
      };
    }
  }

  async getClientsByStatus(status: string, list: string, search: string) {
    try {
      const rows: ClientDTO[] = await this.clientRepo.query(
        'SELECT * FROM client WHERE status=?',
        [status],
      );
      let temp = rows;
      if (list) {
        let temp2=[]
        temp2=rows?.map(item => item.name);

        if(search){
            temp2 = temp2.filter((item) =>
            item.toLowerCase().includes(search.toLowerCase()),
            );
        }
        return temp2.reverse();
      }
      if (search) {
        temp = temp?.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        );
      }
      return temp;
    } catch (error) {
      console.log(error);

      return {
        status: false,
        message: 'Something went wrong',
      };
    }
  }

  async deleteClientDatta(client_id: number) {
    try {
      await this.clientRepo.delete({ client_id });
      return {
        status: true,
        message: 'Client deleted successfully',
      };
    } catch (error) {
      console.log(error);

      return {
        status: false,
        message: 'Something went wrong',
      };
    }
  }

  async getSingleData(status: string, name: string) {
    try {
      const rows = await this.clientRepo.findOne({
        where: {
          status,
          name,
        },
      });

      if (!rows) {
        return {
          status: false,
          message: 'Client not found',
        };
      }

      return rows[0];
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: 'Something went wrong',
      };
    }
  }
}
