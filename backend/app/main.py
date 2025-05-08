from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import blog, comments
from .database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Adjust this in production!
origins = ["http://localhost:3000", "https://frontend.vercel.app"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(blog.router)
app.include_router(comments.router)
