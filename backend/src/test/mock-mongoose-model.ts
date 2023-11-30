export class MockMongooseModel {
  static mockAggregate: jest.Mock = jest.fn();
  static mockDeleteOne: jest.Mock = jest.fn();
  static mockExec: jest.Mock = jest.fn();
  static mockFindById: jest.Mock = jest.fn();
  static mockFindOne: jest.Mock = jest.fn();
  static mockPopulate: jest.Mock = jest.fn();
  static mockSave: jest.Mock = jest.fn();
  static mockSelect: jest.Mock = jest.fn();
  static mockUpdateMany: jest.Mock = jest.fn();
  static mockUpdateOne: jest.Mock = jest.fn();
  static mockCreate: jest.Mock = jest.fn();
  static mockFindByIdAndUpdate: jest.Mock = jest.fn();
  static mockFindOneAndUpdate: jest.Mock = jest.fn();
  static mockFindOneAndDelete: jest.Mock = jest.fn();
  payload: any;

  constructor (payload: any) {
    this.payload = payload;
  }

  public save (): void {
    return MockMongooseModel.mockSave();
  }

  public populate (): void {
    return MockMongooseModel.mockPopulate();
  }

  static exec = (payload: any): void => this.mockExec(payload);
  static select = (payload: any): void => this.mockSelect(payload);
  static findOne = (payload: any): void => this.mockFindOne(payload);
  static findById = (payload: any): void => this.mockFindById(payload);
  static updateOne = (payload: any): void => this.mockUpdateOne(payload);
  static updateMany = (payload: any): void => this.mockUpdateMany(payload);
  static aggregate = (payload: any): void => this.mockAggregate(payload);
  static populate = (payload: any): void => this.mockPopulate(payload);
  static save = (payload: any): void => this.mockSave(payload);
  static create = (payload: any): void => this.mockCreate(payload);
  static findByIdAndUpdate = (payload: any): void => this.mockFindByIdAndUpdate(payload);
  static findOneAndUpdate = (payload: any): void => this.mockFindOneAndUpdate(payload);
  static deleteOne = (payload: any): void => this.mockDeleteOne(payload);
  static findOneAndDelete = (payload: any): void => this.mockFindOneAndDelete(payload);
}
