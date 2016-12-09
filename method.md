---
layout: page
title: method
permalink: /method/
order: 2
---
# Objetivo
Cear una herramienta de medición del impacto en Twitter de cada candidato presidencial, bajo el contexto que su presencia en dicha red social determina lo que piensa un conjunto relevante del electorado en Chile, y se traduciría en una muestra real de sus aspiraciones a transformarse en el o la presidenta de Chile.

# Método
1.- Se ecogen precandidatos(as) presidenciales de acuerdo a su declaración de serlo o su postulación por otros, de acuerdo a la prensa y las encuestas en Chile.
2.- Se crea un archvo json con el nombre del candidato, link a su cuenta de twitter, nombre de usuario e ID.
3.- Para la obtención del ID se utiliza la herramienta "http://gettwitterid.com/" en la cual ingresando el nombre de usuario se obtiene el ID de la cuenta.
4.- Se programa una herramienta en el entorno node.js/npm para la recolección de las métricas correspondientes a los últimos X tweets realizados por cada candidato.
5.- Se utiliza la definición de *potential impressions* y *actual impressions* ([source](http://simplymeasured.com/blog/potential-impressions-vs-actual-impressions-which-should-you-measure/#sm.01ibb7q419o4ei111h81jlsjcytjm)) para determinar el impacto de los tweets de los candidatos, independiente de su contenido.
6.- Fórmula para el cálculo de impressions:

|Author|Tweet|Author Followers(AF)|Potential Impressions|Notes|
|:---|:---|:---|:---|:---|
|decort|@some message|8000|1600|20% of AF|
|schoeny|No @some message|5000|5000|equal AF|
|aviel|some message|2000|2000|equal AF|

> This [method](http://simplymeasured.com/blog/potential-impressions-guide-to-twitter-analytics/#sm.01ibb7q419o4ei111h81jlsjcytjm) will let you define any percentage contribution for followers of @replies from 90% to 10%. For example, if you believe that 20% of the average author’s audience is overlapping with the account replied to, you can use this as a basis for  potential impressions across all @Replies on all Twitter reports.

7.- El cáculo de impressions en el impacto de las campañas presidenciales responde al concepto utilizado principalmente en marketing, relativo al *Key Performance Indicator*: "*A Key Performance Indicator is a measurable value that demonstrates how effectively a company is achieving key business objectives. Organizations use KPIs at multiple levels to evaluate their success at reaching targets. High-level KPIs may focus on the overall performance of the enterprise, while low-level KPIs may focus on processes in departments such as sales, marketing or a call center.*" ([Source](https://www.klipfolio.com/resources/articles/what-is-a-key-performance-indicator#gref)).

8. Se debe crear un fórmula propia para el cálculo del KPI ya que twitter solamente entrega metadados relacionados con el tweet, pero no entrega dicho cálculo procesado.

9. Formula usada por la compañia ripl.io:
- Pull in all available tweets and re-tweets from the twitter search API
- Cache "retweets", "favs", "replys" and "follows"
- Use the following formula to calculate an "engagement" metric":

  + (users total followers/base-1000)
  + (number of retweets*base-1000)
  + (total followers of users who retweeted/base-1000)
  + (favs/base-100)
  + (followers of users who replied/base-1000)
  + (number of users who followed before next tweet*base-100)
  + (number of users who unfollowed before next tweet*base-10000)

10. Calibrar la fórmula en relación a *indegree influence*, *retweets* y *mentions*:
> Analysis of the three influence measures provides a better understanding of the different roles users play in social media. Indegree represents popularity of a user; retweets represent the content value of one’s tweets; and mentions represent the name value of a user. Hence, the top users based on the three measures have little overlap. ([Source](http://www.aaai.org/ocs/index.php/ICWSM/ICWSM10/paper/viewFile/1538/1826)).

  - **Indegree influence**, the number of followers of a user, directly indicates the size of the audience for that user.
  - **Retweet influence**, which we measure through the number of retweets containing one’s name, indicates the ability of that user to generate content with pass-along value.
  - **Mention influence**, which we measure through the number of mentions containing one’s name, indicates the ability of that user to engage others in a conversation.

11. Se utiliza el concepto de **influencia** en el análsis:
> "The Merriam-Webster dictionary defines influence as “the power or capacity of causing an effect in indirect or intangible ways.”" ([Source](http://www.aaai.org/ocs/index.php/ICWSM/ICWSM10/paper/viewFile/1538/1826)).

12. Aplicar [Parson](https://github.com/agrueneberg/Spearson/blob/gh-pages/test/test.spearson.js) para cada una de las áreas o dimensiones de influencia, de la siguiente forma:

|Candidat@|Indegree Rank|Retweet Rank|Mentions Rank|
|:---|:---|:---|:---|
|A|Followers|Cantidad RTs|Cantidad Mentions|
|B|Followers|Cantidad RTs|Cantidad Mentions|
|C|Followers|Cantidad RTs|Cantidad Mentions|

13. Realizar Ranking Semanal y compararlo con el resto de las encuestas y mediciones.

---
## Advanced Measurements

14. Reduce bot bias: https://www.technologyreview.com/s/529461/how-to-spot-a-social-bot-on-twitter/
