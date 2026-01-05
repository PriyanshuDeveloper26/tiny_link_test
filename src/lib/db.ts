// In-memory database for local development
class InMemoryCollection {
  private data: any[] = [];

  async findOne(query: any): Promise<any> {
    if (query.code) {
      return this.data.find(item => item.code === query.code) || null;
    }
    return null;
  }

  async insertOne(doc: any): Promise<any> {
    const newDoc = { ...doc, _id: Date.now().toString() };
    this.data.push(newDoc);
    return { insertedId: newDoc._id };
  }

  async find(query: any = {}): Promise<any> {
    return {
      sort: (sortObj: any) => ({
        toArray: () => {
          const sorted = [...this.data];
          if (sortObj.created_at === -1) {
            sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          }
          return sorted;
        }
      })
    };
  }

  async deleteOne(query: any): Promise<any> {
    const index = this.data.findIndex(item => item.code === query.code);
    if (index !== -1) {
      this.data.splice(index, 1);
      return { deletedCount: 1 };
    }
    return { deletedCount: 0 };
  }

  async updateOne(query: any, update: any): Promise<any> {
    const index = this.data.findIndex(item => item.code === query.code);
    if (index !== -1) {
      this.data[index] = { ...this.data[index], ...update.$set };
      return { modifiedCount: 1 };
    }
    return { modifiedCount: 0 };
  }
}

const linksCollection = new InMemoryCollection();

export async function connectToDatabase(): Promise<any> {
  console.log('✅ Using in-memory database for local development');
  return { collection: () => linksCollection };
}

export async function getLinksCollection(): Promise<InMemoryCollection> {
  return linksCollection;
}

export async function closeConnection(): Promise<void> {
  console.log('📝 In-memory database connection closed');
}
