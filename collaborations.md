---
title: Collaborations
layout: page
permalink: /collaborations/
---

{% assign currentCollaborations = site.data.collaborations | where_exp: "collaboration", "collaboration.endYear == nil" | sort: "name" %}
{% assign formerCollaborations = site.data.collaborations | where_exp: "collaboration", "collaboration.endYear != nil" | sort: "name" %}

{% if currentCollaborations.size > 0 %}
  <h1>Active Collaborations</h1>
  <div>
    {% include list-collaborations.html source=currentCollaborations style="card" %}
  </div>
{% endif %}

{% if formerCollaborations.size > 0 %}
  <h1>Past Collaborations</h1>
  <div>
    {% include list-collaborations.html source=formerCollaborations style="card" %}
  </div>
{% endif %}