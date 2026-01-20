type WithId<T> = T & { id: string };
type NoId<T> = "id" extends keyof T ? never : T;

export interface Crud<
  Create extends object,
  Update extends object = Partial<Create>,
  Model extends { id: string } = WithId<Create>,
> {
  list(): Promise<Model[]>;
  get(data: { id: string }): Promise<Model | null>;
  create(data: NoId<Create>): Promise<Model>;
  update(data: WithId<Update>): Promise<Model>;
  remove(data: { id: string }): Promise<void>;
}
