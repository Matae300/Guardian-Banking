from django.db import models

# Create your models here.
class Member(models.Model):
  fname = models.CharField(max_length=50)
  lname = models.CharField(max_length=50)
  email = models.EmailField()
  passwd = models.CharField(max_length=30)
  age = models.IntegerField()

  def __str__(self):
    return self.fname + ' ' + self.lname

class Account(models.Model):
    accountnumber = models.IntegerField()
    user = models.ForeignKey(Member, on_delete=models.CASCADE)
    balance = models.IntegerField()
    accounttype = models.CharField(max_length=20)  
    createdat = models.DateTimeField(auto_now_add=True)

class Card(models.Model):
    cardnumber = models.IntegerField()
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    cardtype = models.CharField(max_length=20) 
    expiration = models.DateField()
    cvv = models.IntegerField()