var maparegionaldobrasil = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Visualização Geoespacial: Distribuição das Regiões do Brasil",
  "width": 650,
  "height": 500,
  "config": {
    "view": {"stroke": "transparent"},
    "title": {"fontSize": 18, "anchor": "start"}
  },
  "data": {
    "url": "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson",
    "format": {"type": "json", "property": "features"}
  },
  "transform": [
    {
      "calculate": "indexof(['AM','RR','AP','PA','TO','RO','AC'], datum.properties.sigla) >= 0 ? 'Norte' : indexof(['MA','PI','CE','RN','PB','PE','AL','SE','BA'], datum.properties.sigla) >= 0 ? 'Nordeste' : indexof(['MT','DF','GO','MS'], datum.properties.sigla) >= 0 ? 'Centro-Oeste' : indexof(['SP','RJ','ES','MG'], datum.properties.sigla) >= 0 ? 'Sudeste' : 'Sul'",
      "as": "regiao"
    }
  ],
  "projection": {"type": "mercator"},
  "mark": {"type": "geoshape", "stroke": "white", "strokeWidth": 1.5},
  "encoding": {
    "color": {"field": "regiao", "type": "nominal", "title": "Região"},
    "tooltip": [
      {"field": "properties.name", "type": "nominal", "title": "Estado"},
      {"field": "regiao", "type": "nominal", "title": "Região"}
    ]
  }
}

vegaEmbed('#visMap', maparegionaldobrasil);

var QuantidadedemunicípiosporregiãodoBrasil = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "Quantidade de municípios por região do Brasil",
  "width": 700,
  "height": 450,
  "data": {
    "url": "https://raw.githubusercontent.com/Gilberto-Anderson/Projeto_Analise_de_dados/refs/heads/main/brasil_2022_regioes_corrigidas.csv"
  },
  "mark": {"type": "bar", "cornerRadiusTopLeft": 8, "cornerRadiusTopRight": 8},
  "encoding": {
    "x": {
      "field": "regiao",
      "type": "nominal",
      "title": "Região",
      "sort": "-y",
      "axis": {"labelAngle": 0, "labelFontSize": 13, "titleFontSize": 15}
    },
    "y": {
      "aggregate": "count",
      "type": "quantitative",
      "title": "Quantidade de Municípios",
      "axis": {"labelFontSize": 12, "titleFontSize": 15, "grid": true}
    },
    "color": {
      "field": "regiao",
      "type": "nominal",
      "title": "Região",
      "legend": {"titleFontSize": 13, "labelFontSize": 12}
    },
    "tooltip": [
      {"field": "regiao", "type": "nominal", "title": "Região"},
      {"aggregate": "count", "type": "quantitative", "title": "Municípios"}
    ]
  },
  "config": {
    "background": "#ffffff",
    "view": {"stroke": "transparent"},
    "axis": {"domain": false, "tickColor": "#cccccc"},
    "title": {"fontSize": 18, "anchor": "start"}
  },
  "title": "Quantidade de Municípios por Região"
}
vegaEmbed('#vis3', QuantidadedemunicípiosporregiãodoBrasil);

var top10municipiosmaispopulosos = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Top 10 Municípios Mais Populosos",
  "description": "Ranking dos municípios brasileiros com maior população",
  "width": 850,
  "height": 500,
  "data": {
    "url": "https://raw.githubusercontent.com/Gilberto-Anderson/Projeto_Analise_de_dados/refs/heads/main/brasil_2022_regioes_corrigidas.csv"
  },
  "transform": [
    {"calculate": "toNumber(datum.POPULACAO_ESTIMADA)", "as": "POP_NUM"},
    {
      "window": [{"op": "rank", "as": "rank"}],
      "sort": [{"field": "POP_NUM", "order": "descending"}]
    },
    {"filter": "datum.rank <= 10"}
  ],
  "mark": {
    "type": "bar",
    "cornerRadiusTopRight": 8,
    "cornerRadiusBottomRight": 8
  },
  "encoding": {
    "y": {
      "field": "CIDADE",
      "type": "nominal",
      "sort": "-x",
      "title": "Município"
    },
    "x": {
      "field": "POP_NUM",
      "type": "quantitative",
      "title": "População Estimada"
    },
    "color": {"field": "regiao", "type": "nominal"},
    "tooltip": [
      {"field": "CIDADE", "type": "nominal"},
      {"field": "ESTADO", "type": "nominal"},
      {
        "field": "POP_NUM",
        "type": "quantitative",
        "title": "População",
        "format": ",.0f"
      }
    ]
  },
  "config": {
    "background": "#ffffff",
    "view": {"stroke": "transparent"},
    "title": {"fontSize": 18, "anchor": "start"}
  }
};
vegaEmbed('#vis2', top10municipiosmaispopulosos);

var mediaIDHMporregiao =  {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Média do IDHM por Região",
  "width": 650,
  "height": 420,
  "data": {
    "url": "https://raw.githubusercontent.com/Gilberto-Anderson/Projeto_Analise_de_dados/refs/heads/main/brasil_2022_regioes_corrigidas.csv"
  },
  "mark": {"type": "bar", "cornerRadiusTopLeft": 6, "cornerRadiusTopRight": 6},
  "encoding": {
    "x": {
      "field": "regiao",
      "type": "nominal",
      "title": "Região",
      "axis": {"labelAngle": 0, "labelFontSize": 12, "titleFontSize": 14}
    },
    "y": {
      "aggregate": "mean",
      "field": "IDHM",
      "type": "quantitative",
      "title": "Média do IDHM",
      "scale": {"zero": false},
      "axis": {
        "labelFontSize": 12,
        "titleFontSize": 14,
        "format": ".3f",
        "grid": true
      }
    },
    "color": {"field": "regiao", "type": "nominal", "title": "Região"},
    "tooltip": [
      {"field": "regiao", "type": "nominal", "title": "Região"},
      {
        "aggregate": "mean",
        "field": "IDHM",
        "type": "quantitative",
        "title": "Média IDHM",
        "format": ".3f"
      }
    ]
  },
  "config": {
    "background": "#ffffff",
    "view": {"stroke": "transparent"},
    "axis": {"domain": false},
    "title": {"fontSize": 18, "anchor": "start"}
  }
};
vegaEmbed('#vis1', mediaIDHMporregiao);

var mediaeducacaoporregiao =  {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "IDHM Educação por Região",
  "description": "Média do IDHM Educação nas regiões brasileiras",
  "width": 600,
  "height": 400,
  "data": {
    "url": "https://raw.githubusercontent.com/Gilberto-Anderson/Projeto_Analise_de_dados/refs/heads/main/brasil_2022_regioes_corrigidas.csv"
  },
  "mark": {"type": "bar", "cornerRadiusTopLeft": 6, "cornerRadiusTopRight": 6},
  "encoding": {
    "x": {
      "field": "regiao",
      "type": "nominal",
      "title": "Região",
      "axis": {"labelAngle": 0, "labelFontSize": 12, "titleFontSize": 14}
    },
    "y": {
      "aggregate": "mean",
      "field": "IDHM_Educacao",
      "type": "quantitative",
      "title": "Média IDHM Educação",
      "axis": {
        "labelFontSize": 12,
        "titleFontSize": 14,
        "format": ".2f",
        "grid": true
      },
      "scale": {"zero": false}
    },
    "color": {"field": "regiao", "type": "nominal", "title": "Região"},
    "tooltip": [
      {"field": "regiao", "type": "nominal", "title": "Região"},
      {
        "aggregate": "mean",
        "field": "IDHM_Educacao",
        "type": "quantitative",
        "title": "Média Educação",
        "format": ".3f"
      }
    ]
  },
  "config": {
    "background": "#ffffff",
    "view": {"stroke": "transparent"},
    "axis": {"domain": false},
    "title": {"fontSize": 18, "anchor": "start"}
  }
};
vegaEmbed('#vis4', mediaeducacaoporregiao);

var IDHMxPopulacao =  {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "IDHM Médio x População Total por Região",
  "description": "Comparação entre população regional e desenvolvimento humano",
  "width": 750,
  "height": 500,
  "data": {
    "url": "https://raw.githubusercontent.com/Gilberto-Anderson/Projeto_Analise_de_dados/refs/heads/main/brasil_2022_regioes_corrigidas.csv"
  },
  "transform": [
    {"calculate": "toNumber(datum.POPULACAO_ESTIMADA)", "as": "POP_NUM"},
    {
      "aggregate": [
        {"op": "sum", "field": "POP_NUM", "as": "POP_TOTAL"},
        {"op": "mean", "field": "IDHM", "as": "MEDIA_IDHM"}
      ],
      "groupby": ["regiao"]
    }
  ],
  "mark": {
    "type": "circle",
    "opacity": 0.85,
    "stroke": "black",
    "strokeWidth": 1.2
  },
  "encoding": {
    "x": {
      "field": "POP_TOTAL",
      "type": "quantitative",
      "title": "População Total",
      "axis": {
        "labelFontSize": 12,
        "titleFontSize": 15,
        "format": ",.0f",
        "grid": true
      }
    },
    "y": {
      "field": "MEDIA_IDHM",
      "type": "quantitative",
      "title": "IDHM Médio",
      "scale": {"zero": false},
      "axis": {"labelFontSize": 12, "titleFontSize": 15, "format": ".3f"}
    },
    "color": {
      "field": "regiao",
      "type": "nominal",
      "title": "Região",
      "legend": {"titleFontSize": 13, "labelFontSize": 12}
    },
    "size": {
      "field": "POP_TOTAL",
      "type": "quantitative",
      "title": "População",
      "scale": {"range": [400, 4000]}
    },
    "tooltip": [
      {"field": "regiao", "type": "nominal", "title": "Região"},
      {
        "field": "POP_TOTAL",
        "type": "quantitative",
        "title": "População Total",
        "format": ",.0f"
      },
      {
        "field": "MEDIA_IDHM",
        "type": "quantitative",
        "title": "IDHM Médio",
        "format": ".3f"
      }
    ]
  },
  "config": {
    "background": "#ffffff",
    "view": {"stroke": "transparent"},
    "axis": {"domain": false, "tickColor": "#cccccc"},
    "title": {"fontSize": 22, "anchor": "start"}
  }
};
vegaEmbed('#vis5', IDHMxPopulacao);

var EDUCACAOxLONGEVIDADE =   {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Comparação Regional: IDHM Educação vs. Longevidade",
  "description": "Comparação das médias de educação e longevidade por macrorregião.",
  "width": 650, 
  "height": 420, 
  "data": {
    "url": "https://raw.githubusercontent.com/Gilberto-Anderson/Projeto_Analise_de_dados/refs/heads/main/brasil_2022_regioes_corrigidas.csv"
  },
  "transform": [
    {
      "aggregate": [
        {"op": "mean", "field": "IDHM_Educacao", "as": "Educação"},
        {"op": "mean", "field": "IDHM_Longevidade", "as": "Longevidade"}
      ],
      "groupby": ["regiao"]
    },
    {"fold": ["Educação", "Longevidade"], "as": ["Indicador", "Valor"]}
  ],
  "mark": {"type": "bar", "cornerRadiusTopLeft": 6, "cornerRadiusTopRight": 6},
  "encoding": {
    "x": {
      "field": "regiao",
      "type": "nominal",
      "title": "Região",
      "axis": {"labelAngle": 0, "labelFontSize": 12}
    },
    "y": {
      "field": "Valor",
      "type": "quantitative",
      "title": "Média do Índice",
      "scale": {"zero": false},
      "axis": {"grid": true, "format": ".3f", "labelFontSize": 12, "titleFontSize": 14}
    },
    "xOffset": {
      "field": "Indicador" 
    },
    "color": {
      "field": "Indicador",
      "type": "nominal",
      "scale": {"range": ["#3b82f6", "#10b981"]},
      "legend": {
        "title": "Indicador Socioeconômico",
        "orient": "top",
        "labelFontSize": 12,
        "titleFontSize": 12
      }
    },
    "tooltip": [
      {"field": "regiao", "type": "nominal", "title": "Região"},
      {"field": "Indicador", "type": "nominal"},
      {"field": "Valor", "type": "quantitative", "title": "Média", "format": ".3f"}
    ]
  }
};
vegaEmbed('#vis6', EDUCACAOxLONGEVIDADE);

var PIBxREGIAO = {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Top 10 Municípios com Maior PIB",
  "description": "Ranking dos municípios brasileiros com maior PIB",
  "width": 850,
  "height": 500,
  "data": {
    "url": "https://raw.githubusercontent.com/Gilberto-Anderson/Projeto_Analise_de_dados/refs/heads/main/brasil_2022_regioes_corrigidas.csv"
  },
  "transform": [
    {"calculate": "toNumber(datum.PIB)", "as": "PIB_num"},
    {
      "window": [{"op": "rank", "as": "rank"}],
      "sort": [{"field": "PIB_num", "order": "descending"}]
    },
    {"filter": "datum.rank <= 10"}
  ],
  "mark": {
    "type": "bar",
    "cornerRadiusTopRight": 8,
    "cornerRadiusBottomRight": 8
  },
  "encoding": {
    "y": {
      "field": "CIDADE",
      "type": "nominal",
      "sort": "-x",
      "title": "Município",
      "axis": {"labelFontSize": 13, "titleFontSize": 15}
    },
    "x": {
      "field": "PIB_num",
      "type": "quantitative",
      "title": "PIB",
      "axis": {
        "labelFontSize": 12,
        "titleFontSize": 15,
        "grid": true,
        "format": ",.0f"
      }
    },
    "color": {
      "field": "regiao",
      "type": "nominal",
      "title": "Região",
      "legend": {"titleFontSize": 13, "labelFontSize": 12}
    },
    "tooltip": [
      {"field": "CIDADE", "type": "nominal", "title": "Município"},
      {"field": "ESTADO", "type": "nominal", "title": "Estado"},
      {"field": "regiao", "type": "nominal", "title": "Região"},
      {
        "field": "PIB_num",
        "type": "quantitative",
        "title": "PIB",
        "format": ",.0f"
      }
    ]
  },
  "config": {
    "background": "#ffffff",
    "view": {"stroke": "transparent"},
    "axis": {"domain": false, "tickColor": "#cccccc"},
    "title": {"fontSize": 22, "anchor": "start"}
  }
};
vegaEmbed('#vis7', PIBxREGIAO);

var PIBxREGIAO =  {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Participação do PIB por Região",
  "description": "Distribuição do PIB entre as regiões brasileiras",
  "width": 500,
  "height": 400,
  "data": {
    "url": "https://raw.githubusercontent.com/Gilberto-Anderson/Projeto_Analise_de_dados/refs/heads/main/brasil_2022_regioes_corrigidas.csv"
  },
  "transform": [{"calculate": "toNumber(datum.PIB)", "as": "PIB_NUM"}],
  "mark": {
    "type": "arc",
    "outerRadius": 160,
    "stroke": "white",
    "strokeWidth": 2
  },
  "encoding": {
    "theta": {"aggregate": "sum", "field": "PIB_NUM", "type": "quantitative"},
    "color": {"field": "regiao", "type": "nominal", "title": "Região"},
    "tooltip": [
      {"field": "regiao", "type": "nominal", "title": "Região"},
      {
        "aggregate": "sum",
        "field": "PIB_NUM",
        "type": "quantitative",
        "title": "PIB Total",
        "format": ",.0f"
      }
    ]
  },
  "config": {
    "background": "#ffffff",
    "view": {"stroke": "transparent"},
    "legend": {"titleFontSize": 13, "labelFontSize": 12},
    "title": {"fontSize": 18, "anchor": "start"}
  }
};
vegaEmbed('#vis8', PIBxREGIAO);

var PIBxPOPULACAO =  {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "PIB x População por Região",
  "description": "Bubble Chart PIB x População por Região",
  "width": 750,
  "height": 500,
  "data": {
    "url": "https://raw.githubusercontent.com/Gilberto-Anderson/Projeto_Analise_de_dados/refs/heads/main/brasil_2022_regioes_corrigidas.csv"
  },
  "transform": [
    {"calculate": "toNumber(datum.PIB)", "as": "PIB_NUM"},
    {"calculate": "toNumber(datum.POPULACAO_ESTIMADA)", "as": "POP_NUM"},
    {
      "aggregate": [
        {"op": "sum", "field": "PIB_NUM", "as": "PIB_TOTAL"},
        {"op": "sum", "field": "POP_NUM", "as": "POP_TOTAL"},
        {"op": "mean", "field": "IDHM", "as": "MEDIA_IDHM"}
      ],
      "groupby": ["regiao"]
    }
  ],
  "mark": {
    "type": "circle",
    "opacity": 0.85,
    "stroke": "black",
    "strokeWidth": 1.2
  },
  "encoding": {
    "x": {
      "field": "POP_TOTAL",
      "type": "quantitative",
      "title": "População Total",
      "axis": {
        "labelFontSize": 12,
        "titleFontSize": 15,
        "format": ",.0f",
        "grid": true
      }
    },
    "y": {
      "field": "PIB_TOTAL",
      "type": "quantitative",
      "title": "PIB Total",
      "axis": {
        "labelFontSize": 12,
        "titleFontSize": 15,
        "format": ",.0f",
        "grid": true
      }
    },
    "size": {
      "field": "MEDIA_IDHM",
      "type": "quantitative",
      "title": "IDHM Médio",
      "scale": {"zero": false, "range": [400, 4000]}
    },
    "color": {
      "field": "regiao",
      "type": "nominal",
      "title": "Região",
      "legend": {"titleFontSize": 13, "labelFontSize": 12}
    },
    "tooltip": [
      {"field": "regiao", "type": "nominal", "title": "Região"},
      {
        "field": "POP_TOTAL",
        "type": "quantitative",
        "title": "População Total",
        "format": ",.0f"
      },
      {
        "field": "PIB_TOTAL",
        "type": "quantitative",
        "title": "PIB Total",
        "format": ",.0f"
      },
      {
        "field": "MEDIA_IDHM",
        "type": "quantitative",
        "title": "IDHM Médio",
        "format": ".3f"
      }
    ]
  },
  "config": {
    "background": "#ffffff",
    "view": {"stroke": "transparent"},
    "axis": {"domain": false, "tickColor": "#cccccc"},
    "title": {"fontSize": 22, "anchor": "start"}
  }
};
vegaEmbed('#vis9', PIBxPOPULACAO);