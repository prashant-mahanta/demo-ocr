from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
#from .managers import UserManager
# from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext as _
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager
from datetime import datetime

class MyUserManager(BaseUserManager):
    """
    A custom user manager to deal with emails as unique identifiers for auth
    instead of usernames. The default that's used is "UserManager"
    """
    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('lab_id', 7)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('usertype', 0)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:    
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email, password, **extra_fields)


class Lab(models.Model):
    labname = models.CharField(_('labname'), max_length=100)

    def __str__(self):
        return str(self.labname)

class User(AbstractBaseUser, PermissionsMixin):
    
    USER_TYPE = (
        (0, 'Admin'),
        (1, 'Lab Access'),
        (2, 'Project Access'),
    )
    email = models.EmailField(unique=True, null=True)
    name = models.CharField(_('name'), max_length=100)
    lab_id = models.ForeignKey(Lab, on_delete=models.CASCADE)
    usertype = models.IntegerField(_('user type'), choices=USER_TYPE)

    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this site.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )

    objects = MyUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    def get_usertype(self):
        return self.usertype

class Projects(models.Model):
    lab_id = models.ForeignKey(Lab, on_delete=models.CASCADE)
    project_name = models.CharField(_('project name'),max_length=100)
    description = models.CharField(_('Project Description'), max_length=200)
    created_by = models.CharField(_('created by'), max_length=100)
    created_at = models.DateTimeField(_('created at'), default=datetime.now)

    modified_by = models.CharField(max_length=60, null=True)
    modified_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return str(self.project_name)


class LoginTrail(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True, blank=False)
    email = models.EmailField(max_length=60, blank=False)
    ip = models.CharField(max_length=32)
    status = models.CharField(max_length=10, choices=(
                                                ('success','success'),('failed','failed')), default='failed')
    secure = models.CharField(max_length=5, choices=(
                                                ('True','True'),('False','False')), default='False')
    server_name = models.CharField(max_length=30, default='unknown')
    server_port = models.IntegerField(default=0)
    device = models.CharField(max_length=42, default='unknown')
    model = models.CharField(max_length=42, blank=True)
    brand = models.CharField(max_length=42, blank=True)
    browser = models.CharField(max_length=42, default='unknown')
    os = models.CharField(max_length=42, default='unknown')

    def __str__(self):
        return str(self.email)+'\'s attempt'

class Labels(models.Model):
    project_id = models.ForeignKey(Projects, on_delete=models.CASCADE)
    label_name = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    created_by = models.CharField(_('created by'), max_length=100)
    created_at = models.DateTimeField(_('created at'), default=datetime.now)

    modified_by = models.CharField(max_length=60, null=True)
    modified_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return str(self.label_name)


def file_directory_path(instance, filename):
    return '{0}/{1}'.format(instance.project_id.project_name, filename)

def saved_file_directory_path(instance, filename):
    return '{0}/saved/{1}'.format(instance.project_id.project_name, filename)

class Files(models.Model):
    project_id = models.ForeignKey(Projects, on_delete=models.CASCADE)
    file = models.FileField(upload_to=file_directory_path)
    file_status = models.FileField(upload_to=saved_file_directory_path)

    modified_by = models.CharField(max_length=60, null=True)
    modified_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return str(self.file.name)

class Access(models.Model):
    project_id = models.ForeignKey(Projects, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    created_by = models.CharField(_('created by'), max_length=100)
    created_at = models.DateTimeField(_('created at'), default=datetime.now)

    modified_by = models.CharField(max_length=60, null=True)
    modified_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return str(self.user_id.name) + " got access in " + str(self.project_id.project_name)