import React from 'react'


const GoodsCartList = ({selected}) => (
  <div >
    <table className="Select-Goods-List">
      <thead>
        <tr className="Select-Goods-Title">
          <th className="lang">lang</th>
          <th className="title">title</th>
          <th className="level">level</th>
          <th className="volume">volume</th>
          <th className="order">order</th>
          <th className="etc">etc</th>
        </tr>
      </thead>
      <tbody>
      {selected.map((s,i) => (
        <tr key={i} className="Select-Goods-Detail">

          <td className="lang">{s.lang}</td>
          <td className="title">{s.title}</td>
          <td className="level">{s.level}</td>
          <td className="volume">{s.volume}</td>
          <td className="order"><input /></td>
          <td className="etc"><button>delete</button></td>

        </tr>
      ))}
      </tbody>
    </table>
    <div className="Select-Goods-Statement">

    </div>
  </div>
)

export default GoodsCartList
