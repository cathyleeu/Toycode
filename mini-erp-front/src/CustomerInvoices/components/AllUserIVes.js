import React from 'react'
import AllIVesDetail from './AllIVesDetail'

const AllUserIVes = ({allIVes}) => (
    <div>
      { allIVes.map(
        (iv , i) => (
            <div key={i} className="cst-container">
              <AllIVesDetail iv={iv}>
                <div className="IV-Goods-detail-info">
                  <div className="IV-Info col-md-4">
                    <p>{iv.invoiceId}</p>
                    <p>{iv.userEmail}</p>
                  </div>
                  <div className="IV-Addr col-md-7">
                    <p>{iv.delivery.address.zipNo} | {iv.delivery.address.roadAddr}</p>
                    <p>{iv.delivery.address.detailAddr}</p>
                  </div>
                </div>
              </AllIVesDetail>
            </div>
          )
        )
      }
    </div>

)

export default AllUserIVes
