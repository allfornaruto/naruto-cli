# naruto-cli

> 注意：执行路径不应出现中文、空格、特殊符号

> 从源码安装

```bash
# 安装依赖
npm install
# 全局安装cli
npm run build
```

> 直接使用npm发布版

```bash
npm install -g naruto-cli
```

## **`excel2json <excelDirPath> <outDirPath>`**

> 多语言 Excel 转 json 文件

### 参数说明

- `<excelDirPath>`
  - 多语言 Excel 所在目录
- `<outDirPath>`
  - 多语言 Excel 经过转换过输出 JSON 文件的指定目录
  - 即便指定输出目录，jsonForXml 会固定生成在 output/jsonForXml 下

### Excel 示例文件

> excel/lang/language.xlsx

注意：Excel 中红色部分不可修改

### 使用示例

```bash
# 在项目根目录下执行
naruto-cli excel2json ./excel/lang ./output/json
```

## **`json2xml <jsonForXmlDirPath> <outDirPath>`**

将 excel2json 生成的多语言 json 文件 转 xml 文件

### 参数说明

- `<jsonForXmlDirPath>`
  - 多语言 json 所在目录
    - 注意目录选择 jsonForXml 不是 json
    - jsonForXml 会固定生成在项目根目录下的 output/jsonForXml 下
- `<outDirPath>`
  - 多语言 Excel 经过转换过输出 JSON 文件的指定目录

### 使用示例

```bash
# 在项目根目录下执行
naruto-cli json2xml ./output/jsonForXml ./output/xml
```

## **`excel2eventTs <excelDirPath> <outDirPath>`**

事件 Excel 转 typescript 文件

### 参数说明

- `<excelDirPath>`
  - 事件 Excel 所在目录
- `<outDirPath>`
  - 事件 Excel 经过转换过输出 typescript 文件的指定目录

### Excel 示例文件

> excel/event/event.xlsx

注意：Excel 中红色部分不可修改; 事件名格式不可改变

### 使用示例

```bash
# 在项目根目录下执行
naruto-cli excel2eventTs ./excel/event ./output/event
```

## **`tinifyCompressImages [options] <key> <imgDirPath>`**

使用 tinify 对图片进行压缩

### 参数说明

- `<options>`
	- `-ms, --minSize <minSize> 低于该大小的文件会被忽略，单位KB`
	- `-gp, --globPatterns <globPatterns> 符合该通配表达式的文件才会被压缩, 默认值为"*.png,*.jpg"`
- `<key>`
  - 在 [https://tinypng.com] 注册获取到的 key，每个用户有 500 张/月的免费压缩额度
- `<imgDirPath>`
  - 图片目录，如果目录中有中文、空格、特殊符号，可以使用双引号将其包裹，如: "C:\Users\Naruto\Desktop\Img Panda"

### 使用示例

```bash
# 在项目根目录下执行
# 压缩10KB以上的jpeg图片和jpg图片
naruto-cli tinifyCompressImages -ms 10 -gp "*.jpg,*.jpeg" yourTinifyKey ./imgNeedCompress
```
