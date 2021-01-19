<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Administrador Ramal</title>
	
	<link rel="stylesheet" type="text/css" href="../css/styleie9.css" >
	
                <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	
	
	
</head>
<body>
<br />
<br />
<div align=center>
<a href="add.php"><button>Novo Ramal</button></a>
</div>
<br />
<br />


	<div class="container">
		

		<div class="content">
			<div id="lista-ramais">
				
			</div>

<table class="tabela-ramais">
	<thead>
		<th>Departamento</th>
		<th>Setor</th>
		<th>Ramal</th>
		<th>Editar</th>
		
	</thead>
	<tbody>
		<?php
			//fetch data from json
			$data = file_get_contents('../js/ramais.json');
			//decode into php array
			$data = json_decode($data);

			$index = 0;
			foreach($data as $row){
				echo "
					<tr>
						<td>".$row->Departamento."</td>
						<td>".$row->Setor."</td>
						<td>".$row->Ramal."</td>
						
						<td>
							<a href='edit.php?index=".$index."'>Editar </a>
				<!--			<a href='delete.php?index=".$index."'>Delete</a>  -->   
						</td>
					</tr>
				";

				$index++;
			}
		?>
	</tbody>
</table>

<br />
<br />
<br />
<br />

</div></div>
</body>
</html>
