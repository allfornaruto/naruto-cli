# naruto-cli

> 安装

```bash
# 安装依赖
npm install
# 全局安装cli
npm run build
```

## **`excel2json <excelDirPath> <outDirPath>`**

> 多语言 Excel 转 json 文件

### 参数说明

- `<excelDirPath>`
  - 多语言 Excel 所在目录
- `<outDirPath>`
  - 多语言 Excel 经过转换过输出 JSON 文件的指定目录
  - 即便指定输出目录，jsonForXml 会固定生成在 output/jsonForXml 下

### Excel示例文件

> excel/lang/language.xlsx

注意：Excel中红色部分不可修改

### 使用示例

```bash
# 在项目根目录下执行
naruto-cli excel2json ./excel/lang ./output/json
```

## **`json2xml <jsonForXmlDirPath> <outDirPath>`**

将excel2json生成的多语言 json 文件 转 xml 文件

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

### Excel示例文件

> excel/event/event.xlsx

注意：Excel中红色部分不可修改; 事件名格式不可改变

### 使用示例

```bash
# 在项目根目录下执行
naruto-cli excel2eventTs ./excel/event ./output/event
```
