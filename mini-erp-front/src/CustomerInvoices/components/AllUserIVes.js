import React from 'react'

const AllUserIVes = ({allIVes}) => (
    <div>
      { allIVes.map(
        (iv , i) => (
            <div key={i} className="cst-container">
              <div className="IV-Info">
                <p>{iv.userCode}</p>
                <p>{iv.userName}</p>
                <p>{iv.userEmail}</p>
              </div>

              <div className="IV-Goods">
                <div className="IV-Goods-header">
                  <p>주문한 상품</p>
                  <p>{iv.status}</p>
                </div>
                <div className="IV-Goods-body">
                  {iv.requestedGoods.map((goods, i) => (
                    <div key={i} className="IV-Goods-Info">
                      <p>{goods.name}</p>
                      <p>{goods.qutt}</p>
                      <p>{goods.sales}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="IV-Addr">
                <p>{iv.delivery.address.detailAddr}</p>
                <p>{iv.delivery.address.roadAddr}</p>
                <p>{iv.delivery.address.zipNo}</p>
              </div>
            </div>
          )
        )
      }
    </div>

)

export default AllUserIVes
