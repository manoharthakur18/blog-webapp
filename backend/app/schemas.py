from pydantic import BaseModel
from datetime import datetime
from typing import List

class CommentCreate(BaseModel):
    author: str
    text: str

class Comment(CommentCreate):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class BlogPostBase(BaseModel):
    title: str
    slug: str
    content: str

class BlogPostCreate(BlogPostBase):
    pass

class BlogPost(BlogPostBase):
    id: int
    created_at: datetime
    comments: List[Comment] = []

    class Config:
        orm_mode = True
