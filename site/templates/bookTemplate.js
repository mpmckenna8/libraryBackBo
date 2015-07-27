

      <a name="<%= title %>"
      href=<%if(checked.possessed == 'CoF'){ %> "#<%= title %>"  <% }else{  %>
        "#<%= checked.available %>" <% } %> >

         <img height=115 width=90 src="<%= coverImage %>">
         <div class="inimg">
           <p class="checkIm">Check out</p>
         </div> </img>

      </a>
        <ul name="<%= title %>">
            <li><%= title %></li>
            <li><%= author %></li>
            <li><%=

              releaseDate

              %></li>
            <!-- valid html comment
            <li><%= new Date(releaseDate * 100) %></li>
          -->

            <li><% _.each( keywords, function( keyobj ) {%> <%= keyobj.keyword %><% } ); %></li>

        </ul>

        <button class="delete">Delete</button>
        <button class="edit">Edit</button>
