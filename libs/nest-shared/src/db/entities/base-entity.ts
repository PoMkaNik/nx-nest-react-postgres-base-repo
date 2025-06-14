import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

/**
 * Базовая сущность
 */
export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn({
        type: 'timestamptz',
    })
    public created_at: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
    })
    public updated_at: Date;
}
