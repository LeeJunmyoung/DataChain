import * as CryptoJS from "crypto-js";

class Block {
  public index:number;
  public hash:string;
  public previousHash:string;
  public data:string;
  public timestamp:number;

  

  static calculateBlockHash = (index:number,previousHash:string,timestamp:number,data:string):string=>{
    return CryptoJS.SHA256(index+previousHash+timestamp+data).toString();
  };

  static validateStructuer = ( aBlock:Block):boolean =>  {
    return typeof aBlock.index==="number" 
    && typeof aBlock.hash ==="string" 
    && typeof aBlock.previousHash==="string"
    && typeof aBlock.timestamp==="number"
    && typeof aBlock.data==="string";
  }

  constructor(index:number,
    hash:string,
    previousHash:string,
    data:string,
    timestamp:number,
  ){
    this.index=index;
    this.hash=hash;
    this.previousHash=previousHash;
    this.data=data;
    this.timestamp=timestamp;
  }
}



const geenesisBlock:Block = new Block(0,"000000000000","","hello",123456);

let blockchain:Block[] = [geenesisBlock];

const getBlockChain = () : Block[] => blockchain;

const getLatestBlock = () : Block =>blockchain[blockchain.length-1];

const getNewTimeStamp = ():number => Math.round(new Date().getTime()/1000);

const createNewBlock = (data:string) :Block =>{
  const previousBlock:Block = getLatestBlock();
  const newIndex:number = previousBlock.index+1;
  const newTimeStamp:number = getNewTimeStamp();
  const newHash:string = Block.calculateBlockHash(newIndex,previousBlock.hash,newTimeStamp,data);
  const newBlock :Block = new Block(newIndex,newHash,previousBlock.hash,data,newTimeStamp);
  addBlock(newBlock);
  return newBlock;
}

const getHashforBlock = (aBlock:Block):string =>{
  return Block.calculateBlockHash(aBlock.index,aBlock.previousHash,aBlock.timestamp,aBlock.data);
}


const isBlockValid = (candidateBlock:Block,prerviousBlock:Block) :boolean =>{
  if(!Block.validateStructuer(candidateBlock)){
    return false;
  }else if(prerviousBlock.index+1 !== candidateBlock.index){
    return false;
  }else if(prerviousBlock.hash !== candidateBlock.previousHash){
    return false;
  }else if(getHashforBlock(candidateBlock)!==candidateBlock.hash){
    return false;
  }else{
    return true;
  }
} 

const addBlock = (candidateBlock:Block):void =>{

  if(isBlockValid(candidateBlock,getLatestBlock())){
    blockchain.push(candidateBlock);
  }
}

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);
export {};
