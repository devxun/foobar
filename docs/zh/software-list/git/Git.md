# Git

## 配置

### 查看配置信息

```sh
git config --list
```

### 配置用户信息

```sh
git config --global user.name "[name]" # 配置用户名
git config --global user.email "[email address]" # 配置邮箱
```

## 仓库

### 初始化本地仓库

```sh
git init
```

### 克隆远程仓库

```sh
git clone [url]
```

## 操作

### 查看工作区文件状态

```sh
git status
```

### 添加文件到暂存区

```sh
git add [file1] [file2] ... # 添加指定文件到暂存区
git add [dir] # 添加指定目录（包括子目录）到暂存区
git add . # 将当前工作区中当前目录（包括子目录）下的所有新文件和对已有文件的改动提交至暂存区，但不包括被删除的文件
git add -A # 将当前整个工作区中所有的文件改动提交至暂存区，包括新增、修改和被删除的文件，不受当前所在目录限制
```

### 查看当前分支的版本历史

```sh
git log
```

### 提交文件到仓库区

```sh
git commit -m '[message]' # feat 新特性；fix 修复；docs 文档；style 风格；perf 优化
```

### 建立分支

```sh
git branch # 列出所有本地分支
git branch -r # 列出所有远程分支
git branch -a # 列出所有本地分支和远程分支
git branch [branch-name] # 新建分支
git checkout -b [branch-name] # 新建分支并切换

```

### 远程同步

```sh
git remote -v # 显示远程仓库信息
git remote add [url] # 添加远程仓库
git pull [remote] [branch] # 拉取远程仓库的变化，并与本地分支合并
git push [remote] [branch] # 提交本地指定分支到远程仓库

```

### 撤销

```sh
git checkout [file] # 恢复暂存区的指定文件到工作区
git checkout . # 恢复暂存区的所有文件到工作区

```
