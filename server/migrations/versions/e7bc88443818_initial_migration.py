"""initial migration

Revision ID: e7bc88443818
Revises: 
Create Date: 2023-09-18 14:37:49.043959

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e7bc88443818'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('gyms',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('street', sa.String(), nullable=True),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('state', sa.String(), nullable=True),
    sa.Column('zipcode', sa.String(), nullable=True),
    sa.Column('phone', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=True),
    sa.Column('last_name', sa.String(), nullable=True),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.Column('admin', sa.Boolean(), nullable=False),
    sa.Column('current_gym_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['current_gym_id'], ['gyms.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('routes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=True),
    sa.Column('xPosition', sa.String(), nullable=True),
    sa.Column('yPosition', sa.String(), nullable=True),
    sa.Column('video_url', sa.String(), nullable=True),
    sa.Column('setter_id', sa.Integer(), nullable=True),
    sa.Column('gym_id', sa.Integer(), nullable=True),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['gym_id'], ['gyms.id'], ),
    sa.ForeignKeyConstraint(['setter_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('climbs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('route_id', sa.Integer(), nullable=True),
    sa.Column('user_video', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['route_id'], ['routes.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('route_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['route_id'], ['routes.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('likes')
    op.drop_table('climbs')
    op.drop_table('routes')
    op.drop_table('users')
    op.drop_table('gyms')
    # ### end Alembic commands ###
