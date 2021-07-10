![Logo2](https://camo.githubusercontent.com/902235480a5d2b09ea59abffbb5ad7b0f29e5233a57ca54739e17f5a72b2b56b/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f70726163746963616c6465762f696d6167652f66657463682f732d2d4a314d2d7053586f2d2d2f635f696d616767615f7363616c652c665f6175746f2c666c5f70726f67726573736976652c685f3432302c715f6175746f2c775f313030302f68747470733a2f2f6465762d746f2d75706c6f6164732e73332e616d617a6f6e6177732e636f6d2f692f317167337675336e736d376b72616538716b34732e706e67)

# Serverless Ranty - Ebased [![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com) 

## Introduction

This is a Serverless architecture implemented with [Ebased](https://github.com/AndresSomadossi/ebased/packages/413395) library.

## To run this proyect locally follow the next steps:

- Install Serverless cli ->  `npm i -g serverless` [Serverless Instalation](https://www.serverless.com/framework/docs/providers/aws/guide/installation/)
- Configure AWS credentials [Serverless Credentials config](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/)
    
    
- Run the following commands 

```bash
- npm run devDebug
```

The applications will start on `http://localhost:3000`
![image](https://user-images.githubusercontent.com/8229412/124544652-dbdb9f80-ddfd-11eb-8737-ecb182083556.png)



### Infrastructure

![purchaseArchitecture](https://user-images.githubusercontent.com/8229412/124544922-789e3d00-ddfe-11eb-980d-84e0b7aa0f82.jpg)


### Dev Plugins

Contains the following plugins for local development: 

* [serverless-offline](https://github.com/dherault/serverless-offline) - For managing plugins 

## Production environment

### Deploy full services

```bash
npm run deployIntegration (dev environment)
```

### Clean All

```bash
serverless remove
```
