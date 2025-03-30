from sqlalchemy.ext.declarative import declarative_base

# Create a Base class for models
Base = declarative_base()

# Do not import models here to avoid circular imports
# Instead, create a separate base_class_registry.py file for this purpose