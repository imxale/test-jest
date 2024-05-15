# Deploy to GCP

Ce projet utilise GitHub Actions pour déployer une fonction Google Cloud lors des push sur la branche `develop`.

## Déclencheur

Le workflow est déclenché par les push sur `develop` :

```yaml
on:
  push:
    branches:
      - develop
```

## Job de Déploiement

Le job deploy s'exécute sur ubuntu-latest et inclut les étapes suivantes :

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: google-github-actions/setup-gcloud@v1
        with:
          service_account_key: ${{ secrets.svcaccount }}
          project_id: tensile-tenure-423308-e5
      - run: gcloud auth activate-service-account --key-file=./tensile-tenure-423308-e5-0fa52aa16d6a.json
      - run: |
          gcloud functions deploy testjestaxel --gen2 --runtime=nodejs20 --region=us-east1 --source=. --entry-point=helloGET --trigger-http
        env:
          GOOGLE_CLOUD_PROJECT: ${{ secrets.project_id }}
```

## Secrets
- svcaccount: Clé de compte de service Google Cloud en JSON.
- project_id: ID du projet Google Cloud.

![deploy](deploy.png)

## Génération du token
```bash
gcloud auth print-identity-token
```

Exemple de token généré:
```
eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzYjc2MmY4NzFjZGIzYmFlMDA0NGM2NDk2MjJmYzEzOTZlZGEzZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzMjU1NTk0MDU1OS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjMyNTU1OTQwNTU5LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA5NTY1NzE4OTU4MzA3OTQ0ODk5IiwiZW1haWwiOiJheGVsYmxhbmNoYXJkcHJvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiSVNSTWN1ZmFJNHVkbWZVS293M2J5ZyIsImlhdCI6MTcxNTY5NjU5NCwiZXhwIjoxNzE1NzAwMTk0fQ.W1heqJrz8B_3VgCzYY5_7-RkdIycMfxDvRw8cb8JrbwwWa_LAQnU5A3oXXjBRhBwnSXYvzudme-z3DwSd-ctfbF8d9WTOgSZ6ZOOk4G9zYv8loF5IWIOyiALsDn7DF46S_6HXrurIwbwVWKT2b3ylCNe0aBstFVKA4mRXOC8HbapDD1aZ6yY5zyE3_L9m1pMdS1H_qBSrWTUDgFbPNDiRY3iqI8zFY9GzFFOgRtT-RxoeUNcVZCLy07imrWDf7s71EtE3zCfXs2EV9bfIBrumRwfWyUuSmGbijGr7uz4_hc-ubYZ6dCrLaePb_uq1KA3ScV4EEi0mcndPIghJbADEQ
```
