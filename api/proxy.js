export default async function handler(req, res) {
    try {
      // Effectuer une requête vers l'API cible
      const response = await fetch('https://www.emoji.family/api/emojis', {
        headers: {
          'User-Agent': 'Mozilla/5.0', // Contourne les restrictions serveur
        },
      });
  
      // Vérifier si la réponse est valide
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Ajouter les headers CORS nécessaires
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Content-Type'
      );
  
      // Retourner les données de l'API cible
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
  