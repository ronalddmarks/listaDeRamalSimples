<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Novo Ramal</title>

<link rel="stylesheet" type="text/css" href="../css/styleie9.css" >
	
                <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
                
                
                
<style>
        form {
  /* Centralizar o formulário na pagina */
  margin: 0 auto;
  width: 400px;
  /* Ver o esboço do formulário */
  padding: 1em;
  border: 1px solid #CCC;
  border-radius: 1em;
}

form div + div {
  margin-top: 1em;
}

label {
  /* Para garantir que todos os rótulos tenham o mesmo tamanho e estejam devidamente alinhados*/
  display: inline-block;
  width: 90px;
  text-align: right;
}

input, textarea {
  /* 
Para garantir que todos os campos de texto tenham as mesmas configurações de fonte
     Por padrão, as áreas de texto possuem a mesma fonte */
  font: 1em sans-serif;

  /* Para dar o mesmo tamanho a todos os campos de texto*/
  width: 300px;
  box-sizing: border-box;

  /* Para harmonizar o aspecto e a sensação da borda do campo de texto */
  border: 1px solid #999;
}

input:focus, textarea:focus {
  /* Para dar um pouco de destaque aos elementos ativos*/
  border-color: #000;
}

textarea {
  /* Para alinhar corretamente campos de texto multilinha com seus rótulos */
  vertical-align: top;

  /* Para dar espaço suficiente para digitar algum texto */
  height: 5em;
}

.button {
  /* Para posicionar os botões na mesma posição dos campos de texto */
  padding-left: 90px; /* mesmo tamanho que os elementos do rótulo */
}

button {
  /* Esta margem extra representa aproximadamente o mesmo espaço que o espaço
     entre os rótulos e seus campos de texto*/
  margin-left: .5em;
}

    </style>

</head>
<body>


<div class="container">
		

		<div class="content">
			<div id="lista-ramais">
				
			</div>
			
			<br/>

<a href="index.php"><button>Voltar</button></a>
<form method="POST">




<div align=center>



	Novo Ramal
	
	</div>
	
	</br></br>
	
	<p>
		<label for="Departamento">Departamento</label>
		<input type="text" id="Departamento" name="Departamento">
	</p>
	<p>
		<label for="Setor">Setor</label>
		<input type="text" id="Setor" name="Setor">
	</p>
	<p>
		<label for="Ramal">Ramal</label>
		<input type="text" id="Ramal" name="Ramal">
	</p>
	
	<div align=center>
</br></br>
	<input type="submit" name="save" value="Salvar">
	</div>
	
	
</form>

	

	

</div>
</div>


<?php
	if(isset($_POST['save'])){
		//open the json file
		$data = file_get_contents('../js/ramais.json');
		$data = json_decode($data);

		//data in out POST
		$input = array(
			'Departamento' => $_POST['Departamento'],
			'Setor' => $_POST['Setor'],
			'Ramal' => $_POST['Ramal']
					);

		//append the input to our array
		$data[] = $input;
		//encode back to json
		$data = json_encode($data, JSON_PRETTY_PRINT);
		file_put_contents('../js/ramais.json', $data);

		header('location: index.php');
	}
?>
</body>
</html>
