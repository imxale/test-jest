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
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Google Cloud SDK
        uses: google-github-actions/setup-gcloud@v1
        with:
          version: 'latest'
          service_account_key: ${{ secrets.svcaccount }}
          project_id: tensile-tenure-423308-e5

      - name: Run install
        run: npm i

      - name: Run unit tests
        run: npm test

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4.0.1
        with:
          token: fc11a0ce-3fc8-4e47-861f-b38caef8e088
          slug: imxale/test-jest

      - name: Authenticate with gcloud
        run: |
          gcloud auth activate-service-account --key-file=./tensile-tenure-423308-e5-0fa52aa16d6a.json

      - name: Deploy Google function
        run: |
          gcloud functions deploy testjestaxel --gen2 --runtime=nodejs20 --region=us-east1 --source=. --entry-point=helloGET --trigger-http --allow-unauthenticated
        env:
          GOOGLE_CLOUD_PROJECT: ${{ secrets.project_id }}

      - name: Install Java
        run: sudo apt-get install -y openjdk-8-jdk

      - name: Download JMeter
        run: |
          wget https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-5.6.3.tgz
          tar xf apache-jmeter-5.6.3.tgz

      - name: Copy custom JMeter properties
        run: |
          cp tests/stress/jmeter.properties apache-jmeter-5.6.3/bin/

      - name: Get Identity Token
        id: get-identity-token
        run: echo "::set-output name=token::$(gcloud auth print-identity-token)"

      - name: Run JMeter tests
        run: |
          apache-jmeter-5.6.3/bin/jmeter -n -t tests/stress/test_plan.jmx -l test_results.csv -JIDENTITY_TOKEN=${{ steps.get-identity-token.outputs.token }}

      - name: Install latency-lingo-cli
        run: |
          curl -L https://github.com/latency-lingo/cli/releases/latest/download/latency-lingo-cli_linux_amd64.tar.gz \
           | tar -xz

      - name: Upload JMeter report to Lingo
        run: ./latency-lingo-cli publish --file ./test_results.csv --label "checkout flow" --api-key 814f97a2-f518-4384-94dc-dea39bc494fc
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

## Codecov
Le rapport de couverture de code est envoyé à Codecov à l'aide de l'action codecov/codecov-action@v4.0.1.

## JMeter
Les tests de performance sont effectués à l'aide de JMeter. Les résultats sont stockés dans un fichier CSV.
![Exemple de fichier CSV](test_results.csv)

![Codecov](codedev.png)

## Lingo
Le rapport de performance de JMeter est envoyé à Lingo à l'aide de l'action latency-lingo/cli.
![Lingo](lingo.png)
