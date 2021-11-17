import {
    createTransactionEvent,
    HandleBlock,
    HandleTransaction
  } from "forta-agent"
  import agent from "./agent"
  
  describe("bet agent", () => {
    let handleTransaction: HandleTransaction
  
    const createTxEventWithdata = (data:string) => createTransactionEvent({
      transaction:{
        hash:"0xb48ff57326966812864ddfbf57e9a5540d334d9f6e7c42804b44bd1d37b63199",
        to:"0x18b2a687610328590bc8f2e5fedde3b582a49cda",
        from:"123",
        nonce:1,
        gas:"",
        gasPrice:"",
        value:"",
        data:data,
        r:"",
        s:"",
        v:""

        
      },
      type:undefined,
      network:undefined,
      receipt: {
        status:true,
        root:"",
        gasUsed:"",
        cumulativeGasUsed:"",
        logsBloom:"",
        logs:{} as any,
        contractAddress:"0x18b2a687610328590bc8f2e5fedde3b582a49cda",
        blockHash:"",
        blockNumber:1,
        transactionHash:"",
        transactionIndex:1

      },
      block:{}as any


    })
  
    beforeAll(() => {
      handleTransaction = agent.handleTransaction
    })
  
    describe("bet", () => {
      it("bet bear", async () => {
        const txEvent = createTxEventWithdata("0xaa6b873a0000000000000000000000000000000000000000000000000000000000004984")
  
        const findings = await handleTransaction(txEvent)
  
        expect(findings.length).toBe(1)
      })
      it("bet bull", async () => {
        const txEvent = createTxEventWithdata("0x57fb096f0000000000000000000000000000000000000000000000000000000000004984")
  
        const findings = await handleTransaction(txEvent)
  
        expect(findings.length).toBe(1)
        expect(findings[0].metadata.value).toBe("18820")
      })
  
    })
  })