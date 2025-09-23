console.log('🚀 Instalando dependências...');
require('child_process').exec('npm install', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Erro na instalação:', error);
    return;
  }
  
  console.log('✅ Dependências instaladas com sucesso!');
  console.log('\n📱 Para rodar o PWA:');
  console.log('   npm run dev    - Desenvolvimento');
  console.log('   npm run build  - Build produção');
  console.log('   npm run preview - Preview build');
  console.log('\n🌐 O app será instalável no celular!');
});eb5d3d63501edb7cafc4d794
celular!');
});