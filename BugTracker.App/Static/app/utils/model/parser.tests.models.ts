import * as Immutable from 'immutable';
import * as ModelMeta from '../../utils/model/meta';
import * as ModelBase from '../../models/models.base';

/* ************ LEVEL ONE MODEL ************ */

export interface ILevelOneModelUpdate {
    name?: string;
    model?: LevelOneModel;
    models?: Immutable.List<LevelOneModel>;
}

interface ILevelOneModel {
    name: string;
    model: LevelOneModel;
    models: Immutable.List<LevelOneModel>;
    setName(name: string): LevelOneModel;
    setModel(model: LevelOneModel): LevelOneModel;
    setModels(models: Immutable.List<LevelOneModel>): LevelOneModel;
    addModel(model: LevelOneModel): LevelOneModel;
}

const LevelOneModelRecord = Immutable.Record(<ILevelOneModel>{
    name: <string>null,
    model: <LevelOneModel>null,
    models: <Immutable.List<LevelOneModel>>null
});

@ModelMeta.ImplementsClass(LevelOneModelRecord)
export class LevelOneModel implements ILevelOneModel, ModelMeta.IClassHasMetaImplements {
    private _record: Immutable.Map<string, any>;
    @ModelMeta.ImplementsPoco() public get name(): string {
        return this._record.get('name');
    }
    @ModelMeta.ImplementsModel(() => LevelOneModel) public get model(): LevelOneModel {
        return this._record.get('model');
    }
    @ModelMeta.ImplementsModels(Immutable.List, () => LevelOneModel) public get models(): Immutable.List<LevelOneModel> {
        return this._record.get('models');
    }
    public updateFromModel(updateObject: ILevelOneModelUpdate): LevelOneModel {
        var newRecord = this._record.withMutations(map => ModelBase.updateFromModel(map, updateObject));
        return new LevelOneModel(newRecord);
    }
    public setName(name: string): LevelOneModel {
        return new LevelOneModel(this._record.set('name', name));
    }
    public setModel(model: LevelOneModel): LevelOneModel {
        return new LevelOneModel(this._record.set('model', model));
    }
    public setModels(models: Immutable.List<LevelOneModel>): LevelOneModel {
        return new LevelOneModel(this._record.set('models', models));
    }
    public addModel(model: LevelOneModel): LevelOneModel {
        var newSet = this.models.concat(model);
        return new LevelOneModel(this._record.set('models', newSet.toList()));
    }
    
    constructor(initialObject?: ILevelOneModelUpdate) {
        if (initialObject === null || initialObject === void 0) {
            initialObject = {};
        }
        else {
            if (initialObject instanceof LevelOneModelRecord) {
                ModelBase.extendModelWithRecord(this, initialObject);
                return;
            }
            if (!ModelBase.isPlainObject(initialObject)) {
                ModelBase.riseModelInitializationWithNonPlainObjectError('LevelOneModel');
            }
        }
        ModelBase.extendModelWithRecord(this, initialObject, LevelOneModelRecord);
    }

    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setName(...) instead. */
    public set name(value: string) { ModelBase.riseImmutableModelError('LevelOneModel', 'name', 'setName'); }
    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setModel(...) instead. */
    public set model(value: LevelOneModel) { ModelBase.riseImmutableModelError('LevelOneModel', 'model', 'setModel'); }
    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setModels(...) instead. */
    public set models(value: Immutable.List<LevelOneModel>) { ModelBase.riseImmutableModelError('LevelOneModel', 'models', 'setModels'); }
}

/* ************ USER MODEL ************ */

export interface IUserModelUpdate {
    name?: string;
    pet?: PetModel;
}

interface IUserModel {
    name: string;
    pet: PetModel;
    setName(name: string): UserModel;
    setPet(pet: PetModel): UserModel;
}

const UserModelRecord = Immutable.Record(<IUserModel>{
    name: <string>null,
    pet: <PetModel>null
});

@ModelMeta.ImplementsClass(UserModelRecord)
export class UserModel implements IUserModel, ModelMeta.IClassHasMetaImplements {
    private _record: Immutable.Map<string, any>;
    @ModelMeta.ImplementsPoco() public get name(): string {
        return this._record.get('name');
    }
    @ModelMeta.ImplementsModel(() => PetModel) public get pet(): PetModel {
        return this._record.get('pet');
    }
    public updateFromModel(updateObject: IUserModelUpdate): UserModel {
        var newRecord = this._record.withMutations(map => ModelBase.updateFromModel(map, updateObject));
        return new UserModel(newRecord);
    }
    public setName(name: string): UserModel {
        return new UserModel(this._record.set('name', name));
    }
    public setPet(pet: PetModel): UserModel {
        return new UserModel(this._record.set('pet', pet));
    }
    
    constructor(initialObject?: IUserModelUpdate) {
        if (initialObject === null || initialObject === void 0) {
            initialObject = {};
        }
        else {
            if (initialObject instanceof UserModelRecord) {
                ModelBase.extendModelWithRecord(this, initialObject);
                return;
            }
            if (!ModelBase.isPlainObject(initialObject)) {
                ModelBase.riseModelInitializationWithNonPlainObjectError('UserModel');
            }
        }
        ModelBase.extendModelWithRecord(this, initialObject, UserModelRecord);
    }

    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setName(...) instead. */
    public set name(value: string) { ModelBase.riseImmutableModelError('UserModel', 'name', 'setName'); }
    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setPet(...) instead. */
    public set pet(value: PetModel) { ModelBase.riseImmutableModelError('UserModel', 'pet', 'setPet'); }
}

/* ************ PET MODEL ************ */

export interface IPetModelUpdate {
    name?: string;
    aliases?: Immutable.List<string>;
}

interface IPetModel {
    name: string;
    aliases: Immutable.List<string>;
    setName(name: string): PetModel;
    setAliases(aliases: Immutable.List<string>): PetModel;
}

const PetModelRecord = Immutable.Record(<IPetModel>{
    name: <string>null,
    aliases: <Immutable.List<string>>null
});

@ModelMeta.ImplementsClass(PetModelRecord)
export class PetModel implements IPetModel, ModelMeta.IClassHasMetaImplements {
    private _record: Immutable.Map<string, any>;
    @ModelMeta.ImplementsPoco() public get name(): string {
        return this._record.get('name');
    }
    @ModelMeta.ImplementsPocos(Immutable.List) public get aliases(): Immutable.List<string> {
        return this._record.get('aliases');
    }
    public updateFromModel(updateObject: IPetModelUpdate): PetModel {
        var newRecord = this._record.withMutations(map => ModelBase.updateFromModel(map, updateObject));
        return new PetModel(newRecord);
    }
    public setName(name: string): PetModel {
        return new PetModel(this._record.set('name', name));
    }
    public setAliases(aliases: Immutable.List<string>): PetModel {
        return new PetModel(this._record.set('aliases', aliases));
    }
    
    constructor(initialObject?: IPetModelUpdate) {
        if (initialObject === null || initialObject === void 0) {
            initialObject = {};
        }
        else {
            if (initialObject instanceof PetModelRecord) {
                ModelBase.extendModelWithRecord(this, initialObject);
                return;
            }
            if (!ModelBase.isPlainObject(initialObject)) {
                ModelBase.riseModelInitializationWithNonPlainObjectError('PetModel');
            }
        }
        ModelBase.extendModelWithRecord(this, initialObject, PetModelRecord);
    }

    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setName(...) instead. */
    public set name(value: string) { ModelBase.riseImmutableModelError('PetModel', 'name', 'setName'); }
    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setAliases(...) instead. */
    public set aliases(value: Immutable.List<string>) { ModelBase.riseImmutableModelError('PetModel', 'aliases', 'setAliases'); }
}

/* ************ TEST APP STATE ************ */

export class TestAppState {
    @ModelMeta.ImplementsModel(() => LevelOneModel) public model: LevelOneModel;
    @ModelMeta.ImplementsModels(Immutable.List, () => LevelOneModel) public models: Immutable.List<LevelOneModel>;
    @ModelMeta.ImplementsModel(() => UserModel) public user: UserModel;
    @ModelMeta.ImplementsModels(Immutable.Stack, () => UserModel) public userStack: Immutable.Stack<UserModel>;
}