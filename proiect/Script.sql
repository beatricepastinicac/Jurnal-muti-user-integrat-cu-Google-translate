IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'jurnal')
BEGIN
    CREATE DATABASE jurnal;
END
