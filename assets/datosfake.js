// Generador avanzado de datos falsos por país
const paises = [
  { code: 'ES', nombre: 'España' },
  { code: 'MX', nombre: 'México' },
  { code: 'AR', nombre: 'Argentina' },
  { code: 'US', nombre: 'Estados Unidos' },
  { code: 'BR', nombre: 'Brasil' },
  { code: 'CO', nombre: 'Colombia' },
  { code: 'CL', nombre: 'Chile' },
  { code: 'PE', nombre: 'Perú' },
  { code: 'VE', nombre: 'Venezuela' },
  { code: 'FR', nombre: 'Francia' },
  { code: 'IT', nombre: 'Italia' },
  { code: 'DE', nombre: 'Alemania' },
  { code: 'UK', nombre: 'Reino Unido' },
  { code: 'RU', nombre: 'Rusia' },
  { code: 'JP', nombre: 'Japón' },
  { code: 'CN', nombre: 'China' }
];

// Apellidos básicos por país
const apellidos = {
  ES: ['García', 'Martínez', 'López', 'Sánchez', 'Pérez', 'González', 'Rodríguez', 'Fernández', 'Jiménez', 'Ruiz', 'Moreno', 'Alonso', 'Gutiérrez', 'Navarro', 'Torres', 'Domínguez', 'Vázquez', 'Ramos', 'Gil', 'Serrano', 'Molina', 'Blanco', 'Suárez', 'Castro', 'Ortega', 'Delgado', 'Ortiz', 'Marín', 'Rubio', 'Sanz', 'Iglesias', 'Medina', 'Cabrera', 'Reyes', 'Aguilar', 'Vega', 'Campos', 'Cruz', 'Pardo', 'Peña', 'Romero', 'Silva', 'Herrera', 'Méndez', 'Cano', 'Cordero', 'Nieto', 'Bravo', 'León', 'Lara'],
  MX: ['Hernández', 'García', 'Martínez', 'López', 'González', 'Pérez', 'Rodríguez', 'Sánchez', 'Ramírez', 'Cruz', 'Morales', 'Ortiz', 'Gómez', 'Vargas', 'Medina', 'Aguilar', 'Castillo', 'Jiménez', 'Reyes', 'Chávez', 'Mendoza', 'Ruiz', 'Ramos', 'Herrera', 'Silva', 'Romero', 'Soto', 'Gutiérrez', 'Cruz', 'Paredes', 'Delgado', 'Salazar', 'Vega', 'Peña', 'Flores', 'Cabrera', 'Campos', 'Navarro', 'Ibarra', 'Luna', 'Valdez', 'Mora', 'Ríos', 'Acosta', 'Ponce', 'Serrano', 'Cordero', 'Bravo', 'León', 'Lara'],
  AR: ['González', 'Rodríguez', 'Gómez', 'Fernández', 'López', 'Díaz', 'Pérez', 'Martínez', 'Sánchez', 'Romero', 'Alvarez', 'Romano', 'Mendez', 'Acosta', 'Silva', 'Sosa', 'Torres', 'Ramirez', 'Ortiz', 'Medina', 'Herrera', 'Castro', 'Gimenez', 'Ponce', 'Rojas', 'Vera', 'Maidana', 'Peralta', 'Cardozo', 'Barrios', 'Cabrera', 'Reyes', 'Aguilar', 'Vega', 'Campos', 'Cruz', 'Pardo', 'Peña', 'Bravo', 'León', 'Lara'],
  US: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Martinez', 'Hernandez', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'King', 'Wright', 'Scott', 'Green', 'Baker', 'Adams', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers'],
  BR: ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Cardoso', 'Barbosa', 'Rocha', 'Dias', 'Teixeira', 'Moreira', 'Cavalcanti', 'Batista', 'Ramos', 'Campos', 'Freitas', 'Barros', 'Moura', 'Nunes', 'Vieira', 'Pereira', 'Souza', 'Ferreira', 'Lima', 'Mendes', 'Araujo', 'Machado', 'Martins', 'Barbosa', 'Rocha', 'Dias', 'Teixeira', 'Moreira', 'Cavalcanti', 'Batista', 'Ramos', 'Campos', 'Freitas', 'Barros', 'Moura', 'Nunes', 'Vieira'],
  CO: ['García', 'Martínez', 'López', 'Sánchez', 'Pérez', 'González', 'Rodríguez', 'Fernández', 'Jiménez', 'Ruiz', 'Moreno', 'Gómez', 'Castro', 'Romero', 'Vargas', 'Medina', 'Herrera', 'Silva', 'Rojas', 'Mendoza', 'Ruiz', 'Ramos', 'Paredes', 'Cruz', 'Patiño', 'Castaño', 'Córdoba', 'Cárdenas', 'Guzmán', 'Salazar', 'Bravo', 'León', 'Lara', 'Peña', 'Cabrera', 'Reyes', 'Aguilar', 'Vega', 'Campos', 'Nieto', 'Bravo', 'León', 'Lara'],
  CL: ['González', 'Muñoz', 'Rojas', 'Díaz', 'Pérez', 'Soto', 'Contreras', 'Silva', 'Martínez', 'Sepúlveda', 'Gutiérrez', 'Navarro', 'Torres', 'Domínguez', 'Vázquez', 'Ramos', 'Gil', 'Serrano', 'Molina', 'Blanco', 'Suárez', 'Castro', 'Ortega', 'Delgado', 'Ortiz', 'Marín', 'Rubio', 'Sanz', 'Morales', 'Herrera', 'Bravo', 'León', 'Lara', 'Peña', 'Cabrera', 'Reyes', 'Aguilar', 'Vega', 'Campos', 'Nieto', 'Bravo', 'León', 'Lara'],
  PE: ['García', 'Flores', 'Rojas', 'Díaz', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Castillo', 'Vargas', 'Morales', 'Ortiz', 'Gómez', 'Vargas', 'Medina', 'Aguilar', 'Castillo', 'Jiménez', 'Reyes', 'Chávez', 'Mendoza', 'Ruiz', 'Ramos', 'Herrera', 'Silva', 'Romero', 'Soto', 'Gutiérrez', 'Cruz', 'Paredes', 'Delgado', 'Salazar', 'Vega', 'Peña', 'Bravo', 'León', 'Lara', 'Cabrera', 'Reyes', 'Aguilar', 'Vega', 'Campos', 'Nieto', 'Bravo', 'León', 'Lara'],
  VE: ['González', 'Rodríguez', 'Pérez', 'Hernández', 'García', 'Martínez', 'López', 'Sánchez', 'Ramírez', 'Torres', 'Morales', 'Ortiz', 'Gómez', 'Vargas', 'Medina', 'Aguilar', 'Castillo', 'Jiménez', 'Reyes', 'Chávez', 'Mendoza', 'Ruiz', 'Ramos', 'Herrera', 'Silva', 'Romero', 'Soto', 'Gutiérrez', 'Cruz', 'Paredes', 'Delgado', 'Salazar', 'Vega', 'Peña', 'Bravo', 'León', 'Lara', 'Cabrera', 'Reyes', 'Aguilar', 'Vega', 'Campos', 'Nieto', 'Bravo', 'León', 'Lara'],
  FR: ['Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand', 'Leroy', 'Moreau', 'Lefevre', 'Morel', 'Girard', 'Andre', 'Mercier', 'Dupuis', 'Lambert', 'Bonnet', 'Francois', 'Martins', 'Guerin', 'Boyer', 'Garnier', 'Chevalier', 'Faure', 'Roux', 'Picard', 'Muller', 'Henry', 'Renaud', 'Perrot', 'Collet', 'Perrin', 'Marchand', 'Leclerc', 'Aubry', 'Renard', 'Gauthier', 'Barbier', 'Pires', 'Benoit', 'Poulain', 'Jacquet', 'Le Gall', 'Le Roux', 'Le Goff', 'Le Guen', 'Le Floch', 'Le Bris', 'Le Meur'],
  IT: ['Rossi', 'Russo', 'Ferrari', 'Esposito', 'Bianchi', 'Romano', 'Colombo', 'Ricci', 'Marino', 'Greco', 'Gallo', 'Conti', 'Mancini', 'Lombardi', 'Barbieri', 'Fontana', 'Mariani', 'Rizzi', 'Cattaneo', 'Ferraro', 'Fabbri', 'Bianco', 'Palumbo', 'Sanna', 'Farina', 'Riva', 'De Luca', 'Serra', "D'Amico", 'Monti', 'Costa', 'Giordano', 'Moretti', 'Bruno', 'Gallo', 'Conti', 'Mancini', 'Lombardi', 'Barbieri', 'Fontana', 'Mariani', 'Rizzi', 'Cattaneo', 'Ferraro', 'Fabbri', 'Bianco', 'Palumbo', 'Sanna', 'Farina', 'Riva', 'De Luca', 'Serra', 'Monti'],
  DE: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun', 'Krüger', 'Hofmann', 'Hartmann', 'Lange', 'Schmitt', 'Werner', 'Schmitz', 'Krause', 'Meier', 'Lehmann', 'Schmid', 'Schulze', 'Maier', 'Keller', 'Richter', 'Böhm', 'Frank', 'Jung', 'Hahn', 'König', 'Kaiser', 'Lang', 'Scholz', 'Huber', 'Fuchs', 'Peters', 'Herrmann', 'Walter', 'Mayer', 'Arnold', 'Schuster', 'Graf', 'Berger'],
  UK: ['Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Johnson', 'Davies', 'Patel', 'Wright', 'Green', 'King', 'Baker', 'Wright', 'Scott', 'Turner', 'Morgan', 'Hill', 'Ward', 'Carter', 'Evans', 'Collins', 'Bell', 'Cook', 'Parker', 'Morris', 'Murphy', 'Cooper', 'Richardson', 'Bailey', 'Clark', 'Walker', 'Allen', 'Young', 'Hall', 'Lewis', 'Harris', 'Martin', 'Thompson', 'White', 'Jackson', 'Wood', 'Hughes', 'Edwards', 'Moore', 'Clark', 'King', 'Lee', 'Bennett', 'Cox'],
  RU: ['Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров', 'Соколов', 'Михайлов', 'Новиков', 'Федоров', 'Кузнецова', 'Попова', 'Васильева', 'Петрова', 'Соколова', 'Михайлова', 'Новикова', 'Федорова', 'Морозова', 'Волкова', 'Алексеева', 'Лебедева', 'Семенова', 'Егорова', 'Павлова', 'Козлова', 'Степанова', 'Николаева', 'Орлова', 'Макарова', 'Соловьёв', 'Борисов', 'Яковлев', 'Григорьев', 'Романов', 'Воробьёв', 'Сергеев', 'Кузьмин', 'Фролов', 'Александров', 'Дмитриев', 'Егоров', 'Калинин', 'Киселёв', 'Максимов', 'Сорокин', 'Виноградов', 'Белов', 'Медведев', 'Антонов'],
  JP: ['Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura', 'Kobayashi', 'Kato', 'Sasaki', 'Yamada', 'Matsumoto', 'Inoue', 'Kimura', 'Hayashi', 'Shimizu', 'Yamazaki', 'Nakajima', 'Morita', 'Ishikawa', 'Goto', 'Okada', 'Fujita', 'Ogawa', 'Kondo', 'Ishida', 'Saito', 'Fukuda', 'Arai', 'Mori', 'Abe', 'Ikeda', 'Hashimoto', 'Yoshida', 'Yamaguchi', 'Matsui', 'Endo', 'Ota', 'Kaneko', 'Fujii', 'Okamoto', 'Nakagawa', 'Miyazaki', 'Ueda', 'Fukushima', 'Sugiyama', 'Matsuda', 'Imai', 'Takagi', 'Ono'],
  CN: ['王', '李', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴', '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云']
};

// Nombres masculinos y femeninos por país
const nombres_m = {
  ES: ['Carlos', 'José', 'Antonio', 'Manuel', 'Francisco', 'David', 'Juan', 'Javier', 'Luis', 'Miguel', 'Álvaro', 'Sergio', 'Pablo', 'Alejandro', 'Daniel', 'Adrián', 'Diego', 'Raúl', 'Rubén', 'Ángel'],
  MX: ['Juan', 'José', 'Luis', 'Miguel', 'Jesús', 'Francisco', 'Alejandro', 'Fernando', 'Ricardo', 'Eduardo', 'Carlos', 'Manuel', 'Antonio', 'Jorge', 'Roberto', 'Andrés', 'Rafael', 'Sergio', 'Héctor', 'Arturo'],
  AR: ['Martín', 'Mateo', 'Santiago', 'Lucas', 'Benjamín', 'Joaquín', 'Tomás', 'Juan', 'Agustín', 'Franco', 'Facundo', 'Emiliano', 'Gonzalo', 'Nicolás', 'Matías', 'Valentín', 'Lautaro', 'Bruno', 'Simón', 'Iván'],
  US: ['James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Charles', 'Thomas', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark', 'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua'],
  BR: ['João', 'José', 'Antonio', 'Francisco', 'Carlos', 'Paulo', 'Pedro', 'Lucas', 'Luiz', 'Marcos', 'Gabriel', 'Rafael', 'Felipe', 'Bruno', 'Gustavo', 'André', 'Leonardo', 'Rodrigo', 'Eduardo', 'Fernando'],
  CO: ['Juan', 'Carlos', 'Andrés', 'Luis', 'Jorge', 'David', 'Sergio', 'Alejandro', 'Daniel', 'Felipe', 'Camilo', 'Diego', 'Sebastián', 'Miguel', 'Julián', 'Fernando', 'Ricardo', 'Mauricio', 'Oscar', 'Pedro'],
  CL: ['Agustín', 'Benjamín', 'Vicente', 'Matías', 'Joaquín', 'Martín', 'Lucas', 'Tomas', 'Cristóbal', 'Diego', 'Sebastián', 'Emilio', 'Gabriel', 'Ignacio', 'Felipe', 'Francisco', 'Andrés', 'Nicolás', 'Maximiliano', 'Samuel'],
  PE: ['Luis', 'José', 'Juan', 'Carlos', 'Miguel', 'Jorge', 'David', 'Andrés', 'Pedro', 'Manuel', 'Alfredo', 'Ricardo', 'Fernando', 'César', 'Raúl', 'Víctor', 'Martín', 'Enrique', 'Eduardo', 'Roberto'],
  VE: ['José', 'Luis', 'Carlos', 'Juan', 'Miguel', 'Pedro', 'Jesús', 'Manuel', 'Rafael', 'Francisco', 'Andrés', 'Alejandro', 'Antonio', 'Jorge', 'Eduardo', 'Ricardo', 'Fernando', 'David', 'Gabriel', 'Sergio'],
  FR: ['Jean', 'Pierre', 'Michel', 'Alain', 'Philippe', 'Louis', 'Nicolas', 'Laurent', 'Julien', 'Antoine', 'François', 'David', 'Paul', 'Thomas', 'Lucas', 'Hugo', 'Alexandre', 'Maxime', 'Vincent', 'Sébastien'],
  IT: ['Giuseppe', 'Antonio', 'Giovanni', 'Mario', 'Luigi', 'Francesco', 'Angelo', 'Roberto', 'Alessandro', 'Stefano', 'Marco', 'Paolo', 'Matteo', 'Giorgio', 'Riccardo', 'Luca', 'Davide', 'Simone', 'Andrea', 'Fabio'],
  DE: ['Max', 'Paul', 'Ben', 'Leon', 'Elias', 'Felix', 'Jonas', 'Luis', 'Noah', 'Lukas', 'Finn', 'Julian', 'Moritz', 'Tim', 'Philipp', 'David', 'Simon', 'Jan', 'Tom', 'Alexander'],
  UK: ['Oliver', 'George', 'Harry', 'Jack', 'Jacob', 'Charlie', 'Thomas', 'Oscar', 'William', 'James', 'Henry', 'Leo', 'Alfie', 'Joshua', 'Freddie', 'Archie', 'Ethan', 'Isaac', 'Alexander', 'Joseph'],
  RU: ['Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей', 'Артём', 'Илья', 'Кирилл', 'Михаил', 'Никита', 'Матвей', 'Роман', 'Егор', 'Арсений', 'Иван', 'Денис', 'Евгений', 'Тимофей', 'Владимир'],
  JP: ['Haruto', 'Yuto', 'Sota', 'Yuki', 'Hayato', 'Ryusei', 'Kaito', 'Sora', 'Yuma', 'Ren', 'Kenta', 'Daiki', 'Shota', 'Takumi', 'Riku', 'Koki', 'Yudai', 'Taiga', 'Kosei', 'Hinata'],
  CN: ['伟', '强', '磊', '军', '洋', '勇', '俊', '峰', '超', '涛', '明', '刚', '平', '辉', '鹏', '华', '飞', '鑫', '波', '斌']
};
const nombres_f = {
  ES: ['María', 'Carmen', 'Ana', 'Isabel', 'Laura', 'Marta', 'Cristina', 'Sara', 'Paula', 'Lucía', 'Elena', 'Raquel', 'Patricia', 'Sandra', 'Beatriz', 'Silvia', 'Rosa', 'Teresa', 'Sonia', 'Clara'],
  MX: ['Guadalupe', 'María', 'Ana', 'Carmen', 'Sofía', 'Andrea', 'Fernanda', 'Alejandra', 'Gabriela', 'Jessica', 'Patricia', 'Verónica', 'Claudia', 'Diana', 'Elizabeth', 'Rosa', 'Martha', 'Paola', 'Daniela', 'Monica'],
  AR: ['Sofía', 'Valentina', 'Camila', 'Julieta', 'Mía', 'Martina', 'Lucía', 'Agustina', 'Josefina', 'Emilia', 'Catalina', 'Milagros', 'Paula', 'Renata', 'Victoria', 'Antonella', 'Abril', 'Juana', 'Lara', 'Malena'],
  US: ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen', 'Nancy', 'Lisa', 'Margaret', 'Betty', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle'],
  BR: ['Maria', 'Ana', 'Francisca', 'Antônia', 'Adriana', 'Juliana', 'Marcia', 'Fernanda', 'Patricia', 'Aline', 'Sandra', 'Camila', 'Amanda', 'Bruna', 'Letícia', 'Jéssica', 'Gabriela', 'Luciana', 'Vanessa', 'Beatriz'],
  CO: ['María', 'Ana', 'Laura', 'Camila', 'Valentina', 'Daniela', 'Andrea', 'Paula', 'Sara', 'Juliana', 'Isabella', 'Gabriela', 'Manuela', 'Sofía', 'Carolina', 'Mariana', 'Luisa', 'Natalia', 'Diana', 'Melissa'],
  CL: ['Josefa', 'Sofía', 'Isidora', 'Antonia', 'Florencia', 'Valentina', 'Martina', 'Emilia', 'Agustina', 'Fernanda', 'Camila', 'Catalina', 'Trinidad', 'Javiera', 'Amanda', 'Paula', 'Renata', 'Constanza', 'Romina', 'Daniela'],
  PE: ['María', 'Ana', 'Carmen', 'Rosa', 'Lucía', 'Patricia', 'Sandra', 'Jessica', 'Paola', 'Gabriela', 'Verónica', 'Diana', 'Elizabeth', 'Martha', 'Daniela', 'Monica', 'Claudia', 'Juana', 'Teresa', 'Sonia'],
  VE: ['María', 'Ana', 'Carmen', 'Isabel', 'Sofía', 'Gabriela', 'Patricia', 'Jessica', 'Daniela', 'Rosa', 'Verónica', 'Claudia', 'Diana', 'Elizabeth', 'Martha', 'Paola', 'Sandra', 'Monica', 'Luisa', 'Teresa'],
  FR: ['Marie', 'Camille', 'Julie', 'Lucie', 'Sophie', 'Chloé', 'Sarah', 'Emma', 'Manon', 'Laura', 'Pauline', 'Clara', 'Anaïs', 'Léa', 'Élise', 'Charlotte', 'Alice', 'Mathilde', 'Céline', 'Amandine'],
  IT: ['Maria', 'Giulia', 'Francesca', 'Anna', 'Chiara', 'Sara', 'Martina', 'Alessia', 'Valentina', 'Federica', 'Elena', 'Silvia', 'Roberta', 'Simona', 'Angela', 'Giorgia', 'Aurora', 'Paola', 'Cristina', 'Beatrice'],
  DE: ['Sophie', 'Marie', 'Emilia', 'Hannah', 'Anna', 'Lea', 'Lina', 'Mia', 'Lena', 'Laura', 'Clara', 'Emma', 'Luisa', 'Johanna', 'Amelie', 'Lilly', 'Paula', 'Charlotte', 'Sarah', 'Maja'],
  UK: ['Olivia', 'Amelia', 'Isla', 'Ava', 'Emily', 'Sophia', 'Grace', 'Lily', 'Evie', 'Jessica', 'Ella', 'Poppy', 'Charlotte', 'Isabella', 'Mia', 'Ruby', 'Sophie', 'Freya', 'Florence', 'Alice'],
  RU: ['Мария', 'Анна', 'Елена', 'Ольга', 'Наталья', 'Татьяна', 'Ирина', 'Светлана', 'Екатерина', 'Юлия', 'Анастасия', 'Виктория', 'Марина', 'Галина', 'Любовь', 'Вера', 'Евгения', 'Дарья', 'Ксения', 'Полина'],
  JP: ['Yui', 'Hina', 'Sakura', 'Riko', 'Mio', 'Yuna', 'Aoi', 'Rin', 'Nanami', 'Akari', 'Mei', 'Ayaka', 'Haruka', 'Kanon', 'Miyu', 'Yuna', 'Kokoro', 'Noa', 'Hinata', 'Sara'],
  CN: ['芳', '娜', '敏', '静', '秀英', '丽', '艳', '娟', '英', '梅', '莉', '玉兰', '桂英', '丹', '萍', '红', '玉', '霞', '平', '玲']
};
// Apellidos extendidos
const apellidos_ext = {
  ES: [...apellidos.ES, 'Moreno', 'Alonso', 'Gutiérrez', 'Navarro', 'Torres', 'Domínguez', 'Vázquez', 'Ramos', 'Gil', 'Serrano', 'Molina', 'Blanco', 'Suárez', 'Castro', 'Ortega', 'Delgado', 'Ortiz', 'Marín', 'Rubio', 'Sanz'],
  MX: [...apellidos.MX, 'Morales', 'Ortiz', 'Gómez', 'Vargas', 'Medina', 'Aguilar', 'Castillo', 'Jiménez', 'Reyes', 'Chávez', 'Mendoza', 'Ruiz', 'Ramos', 'Herrera', 'Silva', 'Romero', 'Soto', 'Gutiérrez', 'Cruz', 'Paredes'],
  AR: [...apellidos.AR, 'Alvarez', 'Romano', 'Mendez', 'Acosta', 'Silva', 'Sosa', 'Torres', 'Ramirez', 'Ortiz', 'Medina', 'Herrera', 'Castro', 'Gimenez', 'Ponce', 'Rojas', 'Vera', 'Maidana', 'Peralta', 'Cardozo', 'Barrios'],
  US: [...apellidos.US, 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young'],
  BR: [...apellidos.BR, 'Costa', 'Cardoso', 'Barbosa', 'Rocha', 'Dias', 'Teixeira', 'Moreira', 'Cavalcanti', 'Batista', 'Ramos', 'Campos', 'Freitas', 'Barros', 'Moura', 'Nunes', 'Vieira', 'Pereira', 'Souza', 'Ferreira', 'Lima'],
  CO: [...apellidos.CO, 'Moreno', 'Gómez', 'Castro', 'Romero', 'Vargas', 'Medina', 'Herrera', 'Silva', 'Rojas', 'Mendoza', 'Ruiz', 'Ramos', 'Paredes', 'Cruz', 'Patiño', 'Castaño', 'Córdoba', 'Cárdenas', 'Guzmán', 'Salazar'],
  CL: [...apellidos.CL, 'Gutiérrez', 'Navarro', 'Torres', 'Domínguez', 'Vázquez', 'Ramos', 'Gil', 'Serrano', 'Molina', 'Blanco', 'Suárez', 'Castro', 'Ortega', 'Delgado', 'Ortiz', 'Marín', 'Rubio', 'Sanz', 'Morales', 'Herrera'],
  PE: [...apellidos.PE, 'Morales', 'Ortiz', 'Gómez', 'Vargas', 'Medina', 'Aguilar', 'Castillo', 'Jiménez', 'Reyes', 'Chávez', 'Mendoza', 'Ruiz', 'Ramos', 'Herrera', 'Silva', 'Romero', 'Soto', 'Gutiérrez', 'Cruz', 'Paredes'],
  VE: [...apellidos.VE, 'Morales', 'Ortiz', 'Gómez', 'Vargas', 'Medina', 'Aguilar', 'Castillo', 'Jiménez', 'Reyes', 'Chávez', 'Mendoza', 'Ruiz', 'Ramos', 'Herrera', 'Silva', 'Romero', 'Soto', 'Gutiérrez', 'Cruz', 'Paredes'],
  FR: [...apellidos.FR, 'Lefevre', 'Morel', 'Girard', 'Andre', 'Mercier', 'Dupuis', 'Lambert', 'Bonnet', 'Francois', 'Martins', 'Guerin', 'Boyer', 'Garnier', 'Chevalier', 'Faure', 'Roux', 'Picard', 'Muller', 'Henry', 'Renaud'],
  IT: [...apellidos.IT, 'Gallo', 'Conti', 'Mancini', 'Lombardi', 'Barbieri', 'Fontana', 'Mariani', 'Rizzi', 'Cattaneo', 'Ferraro', 'Fabbri', 'Bianco', 'Palumbo', 'Sanna', 'Farina', 'Riva', 'De Luca', 'Serra', "D'Amico", 'Monti'],
  DE: [...apellidos.DE, 'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun', 'Krüger', 'Hofmann', 'Hartmann', 'Lange', 'Schmitt', 'Werner', 'Schmitz', 'Krause', 'Meier', 'Lehmann', 'Schmid', 'Schulze', 'Maier'],
  UK: [...apellidos.UK, 'Green', 'King', 'Baker', 'Wright', 'Scott', 'Turner', 'Morgan', 'Hill', 'Ward', 'Carter', 'Evans', 'Collins', 'Bell', 'Cook', 'Parker', 'Morris', 'Murphy', 'Cooper', 'Richardson', 'Bailey'],
  RU: [...apellidos.RU, 'Кузнецова', 'Попова', 'Васильева', 'Петрова', 'Соколова', 'Михайлова', 'Новикова', 'Федорова', 'Морозова', 'Волкова', 'Алексеева', 'Лебедева', 'Семенова', 'Егорова', 'Павлова', 'Козлова', 'Степанова', 'Николаева', 'Орлова', 'Макарова'],
  JP: [...apellidos.JP, 'Sasaki', 'Yamada', 'Matsumoto', 'Inoue', 'Kimura', 'Hayashi', 'Shimizu', 'Yamazaki', 'Nakajima', 'Morita', 'Ishikawa', 'Goto', 'Okada', 'Fujita', 'Ogawa', 'Kondo', 'Ishida', 'Saito', 'Fukuda', 'Arai'],
  CN: [...apellidos.CN, '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许']
};

const generos = ['Masculino', 'Femenino'];

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split('T')[0];
}
function randomHeight() {
  // Estatura realista en cm (rango 150-200)
  return Math.floor(150 + Math.random() * 50);
}
function randomWeight() {
  // Peso realista en kg (rango 45-120)
  return Math.floor(45 + Math.random() * 75);
}
function randomPhone(code) {
  switch(code) {
    case 'PE': // Perú: +51 9XXXXXXXX
      return '+51 9' + Math.floor(10000000 + Math.random() * 90000000);
    case 'AR': // Argentina: +54 9XXXXXXXXXX (10 dígitos móviles)
      return '+54 9' + Math.floor(100000000 + Math.random() * 900000000);
    case 'MX': // México: +52 55XXXXXXXX (CDMX), +52 1XXXXXXXXX (resto)
      return '+52 ' + (Math.random() < 0.5 ? '55' : '1') + Math.floor(10000000 + Math.random() * 90000000);
    case 'ES': // España: +34 6XXXXXXXX o 7XXXXXXXX
      return '+34 ' + (Math.random() < 0.5 ? '6' : '7') + Math.floor(10000000 + Math.random() * 9000000);
    case 'US': // USA: +1 NXXNXXXXXX (N=2-9)
      return '+1 ' + (Math.floor(Math.random()*8)+2) + Math.floor(100000000 + Math.random()*90000000);
    case 'BR': // Brasil: +55 9XXXXXXXX
      return '+55 9' + Math.floor(10000000 + Math.random() * 90000000);
    case 'CO': // Colombia: +57 3XXXXXXXXX
      return '+57 3' + Math.floor(100000000 + Math.random() * 90000000);
    case 'CL': // Chile: +56 9XXXXXXXX
      return '+56 9' + Math.floor(10000000 + Math.random() * 90000000);
    case 'VE': // Venezuela: +58 4XXXXXXXXX
      return '+58 4' + Math.floor(100000000 + Math.random() * 90000000);
    case 'FR': // Francia: +33 6XXXXXXXX o 7XXXXXXXX
      return '+33 ' + (Math.random() < 0.5 ? '6' : '7') + Math.floor(10000000 + Math.random() * 9000000);
    case 'IT': // Italia: +39 3XXXXXXXXX
      return '+39 3' + Math.floor(100000000 + Math.random() * 90000000);
    case 'DE': // Alemania: +49 15XXXXXXXX, 16XXXXXXXX, 17XXXXXXXX
      const prefixDE = ['15','16','17'][Math.floor(Math.random()*3)];
      return '+49 ' + prefixDE + Math.floor(10000000 + Math.random() * 9000000);
    case 'UK': // Reino Unido: +44 7XXXXXXXXX
      return '+44 7' + Math.floor(100000000 + Math.random() * 90000000);
    case 'RU': // Rusia: +7 9XXXXXXXXX
      return '+7 9' + Math.floor(100000000 + Math.random() * 90000000);
    case 'JP': // Japón: +81 90XXXXXXXX, 80XXXXXXXX, 70XXXXXXXX
      const prefixJP = ['90','80','70'][Math.floor(Math.random()*3)];
      return '+81 ' + prefixJP + Math.floor(10000000 + Math.random() * 9000000);
    case 'CN': // China: +86 1XXXXXXXXXX
      return '+86 1' + Math.floor(1000000000 + Math.random() * 900000000);
    default:
      return '+00 ' + Math.floor(100000000 + Math.random() * 90000000);
  }
}
function randomEmail(nombre, apellido, code) {
  return `${nombre.toLowerCase()}.${apellido.toLowerCase()}${Math.floor(Math.random()*1000)}@gmail.com`;
}
function randomDNI(code) {
  switch(code) {
    case 'PE': // Perú: 8 dígitos
      return Math.floor(10000000 + Math.random()*90000000).toString();
    case 'AR': // Argentina: 7-8 dígitos
      return Math.floor(2000000 + Math.random()*80000000).toString();
    case 'MX': // México: CURP (18 caracteres alfanuméricos simplificado)
      const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const nums = '0123456789';
      let curp = '';
      for(let i=0;i<4;i++) curp += letras[Math.floor(Math.random()*letras.length)];
      for(let i=0;i<6;i++) curp += nums[Math.floor(Math.random()*nums.length)];
      for(let i=0;i<8;i++) curp += letras[Math.floor(Math.random()*letras.length)];
      return curp;
    case 'ES': // España: 8 dígitos + letra
      const dniNum = Math.floor(10000000 + Math.random()*90000000);
      const letrasDNI = 'TRWAGMYFPDXBNJZSQVHLCKE';
      return dniNum + letrasDNI[dniNum%23];
    case 'US': // USA: SSN 3-2-4
      return Math.floor(100+Math.random()*900) + '-' + Math.floor(10+Math.random()*90) + '-' + Math.floor(1000+Math.random()*9000);
    case 'BR': // Brasil: CPF 000.000.000-00
      return `${Math.floor(100+Math.random()*900)}.${Math.floor(100+Math.random()*900)}.${Math.floor(100+Math.random()*900)}-${Math.floor(10+Math.random()*90)}`;
    case 'CO': // Colombia: 10 dígitos
      return Math.floor(1000000000 + Math.random()*9000000000).toString();
    case 'CL': // Chile: 7-8 dígitos + guion + dígito verificador
      const rut = Math.floor(1000000 + Math.random()*90000000);
      const dv = Math.floor(Math.random()*10);
      return rut + '-' + dv;
    case 'VE': // Venezuela: V-XXXXXXXX
      return 'V-' + Math.floor(10000000 + Math.random()*90000000);
    case 'FR': // Francia: 13 dígitos
      return Math.floor(1000000000000 + Math.random()*9000000000000).toString();
    case 'IT': // Italia: Codice Fiscale (simplificado)
      let cf = '';
      for(let i=0;i<6;i++) cf += letras[Math.floor(Math.random()*letras.length)];
      for(let i=0;i<2;i++) cf += nums[Math.floor(Math.random()*nums.length)];
      for(let i=0;i<7;i++) cf += letras[Math.floor(Math.random()*letras.length)];
      return cf;
    case 'DE': // Alemania: 10-11 dígitos
      return Math.floor(1000000000 + Math.random()*90000000000).toString();
    case 'UK': // Reino Unido: 2 letras + 6 dígitos + 1 letra
      let nino = '';
      for(let i=0;i<2;i++) nino += letras[Math.floor(Math.random()*letras.length)];
      nino += Math.floor(100000 + Math.random()*900000);
      nino += letras[Math.floor(Math.random()*letras.length)];
      return nino;
    case 'RU': // Rusia: 10-12 dígitos
      return Math.floor(1000000000 + Math.random()*900000000000).toString();
    case 'JP': // Japón: 12 dígitos
      return Math.floor(100000000000 + Math.random()*900000000000).toString();
    case 'CN': // China: 18 dígitos
      return Math.floor(100000000000000000 + Math.random()*900000000000000000).toString();
    default:
      return Math.floor(10000000 + Math.random()*90000000).toString();
  }
}
function randomAddress(code) {
  switch(code) {
    case 'PE': // Perú
      return `Av. ${randomItem(apellidos[code]||['Central'])} ${Math.floor(100+Math.random()*900)}, Lima, Perú`;
    case 'AR':
      return `Calle ${randomItem(apellidos[code]||['Central'])} ${Math.floor(100+Math.random()*900)}, Buenos Aires, Argentina`;
    case 'MX':
      return `Calle ${randomItem(apellidos[code]||['Central'])} ${Math.floor(100+Math.random()*900)}, CDMX, México`;
    case 'ES':
      return `Calle ${randomItem(apellidos[code]||['Central'])} ${Math.floor(1+Math.random()*99)}, Madrid, España`;
    case 'US':
      return `${Math.floor(100+Math.random()*9000)} ${randomItem(['Main St','Oak St','Pine St','Maple Ave','Cedar Ave'])}, ${randomItem(['New York','Los Angeles','Chicago','Houston','Miami'])}, USA`;
    case 'BR':
      return `Rua ${randomItem(apellidos[code]||['Central'])} ${Math.floor(100+Math.random()*900)}, São Paulo, Brasil`;
    case 'CO':
      return `Carrera ${Math.floor(1+Math.random()*99)} #${Math.floor(1+Math.random()*99)}-${Math.floor(1+Math.random()*99)}, Bogotá, Colombia`;
    case 'CL':
      return `Av. ${randomItem(apellidos[code]||['Central'])} ${Math.floor(100+Math.random()*900)}, Santiago, Chile`;
    case 'VE':
      return `Av. ${randomItem(apellidos[code]||['Central'])} ${Math.floor(100+Math.random()*900)}, Caracas, Venezuela`;
    case 'FR':
      return `${Math.floor(1+Math.random()*99)} Rue ${randomItem(apellidos[code]||['Central'])}, París, Francia`;
    case 'IT':
      return `Via ${randomItem(apellidos[code]||['Central'])} ${Math.floor(1+Math.random()*99)}, Roma, Italia`;
    case 'DE':
      return `${Math.floor(1+Math.random()*99)} ${randomItem(['Hauptstrasse','Bahnhofstrasse','Schulstrasse','Gartenstrasse'])}, Berlín, Alemania`;
    case 'UK':
      return `${Math.floor(1+Math.random()*99)} ${randomItem(['High St','Station Rd','Church St','London Rd'])}, Londres, Reino Unido`;
    case 'RU':
      return `Ulitsa ${randomItem(apellidos[code]||['Central'])} ${Math.floor(1+Math.random()*99)}, Moscú, Rusia`;
    case 'JP':
      return `${Math.floor(1+Math.random()*99)}-${Math.floor(1+Math.random()*99)}, ${randomItem(['Shibuya','Shinjuku','Minato','Chiyoda'])}, Tokio, Japón`;
    case 'CN':
      return `${Math.floor(1+Math.random()*99)} ${randomItem(["Nanjing Rd","Chang'an Ave","Wangfujing St"])}, Pekín, China`;
    default:
      return `Calle ${randomItem(apellidos[code]||['Central'])} ${Math.floor(100+Math.random()*900)}, Ciudad, País`;
  }
}
function randomAvatar(nombre, apellido) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(nombre+' '+apellido)}&background=random&size=128`;
}

function generarDatos(opts) {
  const res = [];
  for(let i=0;i<opts.cantidad;i++){
    const code = opts.pais;
    const genero = randomItem(generos);
    let nombre;
    if(genero === 'Masculino') {
      nombre = randomItem(nombres_m[code]||['Nombre']);
    } else {
      nombre = randomItem(nombres_f[code]||['Nombre']);
    }
    // Dos apellidos
    const apellido1 = randomItem(apellidos_ext[code]||['Apellido']);
    let apellido2 = randomItem(apellidos_ext[code]||['Apellido']);
    while(apellido2 === apellido1) apellido2 = randomItem(apellidos_ext[code]||['Apellido']);
    const nombreCompleto = `${nombre} ${apellido1} ${apellido2}`;
    const fechaNacimiento = randomDate(new Date(1950,0,1), new Date(2005,11,31));
    const direccion = randomAddress(code);
    const telefono = randomPhone(code);
    const email = randomEmail(nombre, apellido1, code);
    const documento = randomDNI(code);
    const avatar = randomAvatar(nombre, apellido1);
    const estatura = randomHeight();
    const peso = randomWeight();
    const obj = {};
    if(opts.campos.nombre) obj.nombre = nombreCompleto;
    if(opts.campos.genero) obj.genero = genero;
    if(opts.campos.fechaNacimiento) obj.fechaNacimiento = fechaNacimiento;
    if(opts.campos.direccion) obj.direccion = direccion;
    if(opts.campos.telefono) obj.telefono = telefono;
    if(opts.campos.email) obj.email = email;
    if(opts.campos.documento) obj.documento = documento;
    if(opts.campos.avatar) obj.avatar = avatar;
    obj.estatura = estatura + ' cm';
    obj.peso = peso + ' kg';
    res.push(obj);
  }
  return res;
}

document.addEventListener('DOMContentLoaded', function() {
  // Llenar países
  const paisSel = document.getElementById('pais');
  paises.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.code;
    opt.textContent = p.nombre;
    paisSel.appendChild(opt);
  });
  // Generar datos
  document.getElementById('fakeDataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const pais = paisSel.value;
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const campos = {
      nombre: document.getElementById('chkNombre').checked,
      genero: document.getElementById('chkGenero').checked,
      fechaNacimiento: document.getElementById('chkFechaNacimiento').checked,
      direccion: document.getElementById('chkDireccion').checked,
      telefono: document.getElementById('chkTelefono').checked,
      email: document.getElementById('chkEmail').checked,
      documento: document.getElementById('chkDocumento').checked,
      avatar: document.getElementById('chkAvatar').checked
    };
    const datos = generarDatos({pais, cantidad, campos});
    const resultBox = document.getElementById('resultBox');
    resultBox.style.display = 'block';
    resultBox.innerHTML = datos.map(d => {
      let html = '<div class="mb-3 p-3 rounded bg-dark text-light shadow-sm">';
      if(d.avatar) html += `<img src="${d.avatar}" alt="avatar" class="rounded-circle mb-2" style="width:64px;height:64px;object-fit:cover;">`;
      if(d.nombre) html += `<div><b>Nombre:</b> ${d.nombre}</div>`;
      if(d.genero) html += `<div><b>Género:</b> ${d.genero}</div>`;
      if(d.fechaNacimiento) html += `<div><b>Fecha de nacimiento:</b> ${d.fechaNacimiento}</div>`;
      if(d.direccion) html += `<div><b>Dirección:</b> ${d.direccion}</div>`;
      if(d.telefono) html += `<div><b>Teléfono:</b> ${d.telefono}</div>`;
      if(d.email) html += `<div><b>Email:</b> ${d.email}</div>`;
      if(d.documento) html += `<div><b>Documento:</b> ${d.documento}</div>`;
      html += `<div><b>Estatura:</b> ${d.estatura}</div>`;
      html += `<div><b>Peso:</b> ${d.peso}</div>`;
      html += '</div>';
      return html;
    }).join('');
    document.getElementById('copyBtn').style.display = 'inline-block';
  });
  document.getElementById('resetBtn').addEventListener('click', function(){
    document.getElementById('fakeDataForm').reset();
    document.getElementById('resultBox').style.display = 'none';
    document.getElementById('copyBtn').style.display = 'none';
  });
  document.getElementById('copyBtn').addEventListener('click', function(){
    const text = document.getElementById('resultBox').innerText;
    navigator.clipboard.writeText(text);
  });
}); 