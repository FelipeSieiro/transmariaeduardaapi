
export class PrismaService {

  async $transaction(callback:any){

    return callback(this);

  }

}

