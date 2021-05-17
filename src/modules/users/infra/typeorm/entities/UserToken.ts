import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Generated,
} from 'typeorm';

@Entity('users_tokens')
class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Generated('uuid')
    @Column()
    token: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_up: Date;
}

export default UserToken;
