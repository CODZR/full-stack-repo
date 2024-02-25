table `faq` depends on the table `user` , please run it first
```
dbt run --select user
```

TODO: 创建的`faq__dbt_tmp` temp表里外键在数据库是正常的，但是到正式表faq里外键关系消失了，dbt可能对外键还不是很支持先mark下
```
owner_id int not null references public.user(id)
```